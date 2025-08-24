import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { signal } from '@angular/core';
import DOMPurify from 'dompurify';
import { marked } from 'marked';
import { ApiState } from '../types/api-state.type';
import { Page } from '../types/page.type';
import { Post } from '../types/post.type';
import { of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private http = inject(HttpClient);

  postsApiState = signal<ApiState<Page<Post>>>({
    loading: false,
    error: undefined,
    firstLoad: true,
  });

  postFileNames = signal<string[]>(['2025-06-15-immich-self-hosted.md']);
  content = signal<Post[]>([
    {
      id: '1',
      title: 'Take Control of Your Photos - Self-Host Immich on Your Server',
      description: 'This is the first post',
      date: '2023-01-01',
      fileName: '2023-01-01-first-post.md',
      imageUrl: '/img/immich-self-hosted-hero.webp',
    },
    {
      id: '2',
      title: 'How I Run Docker on TrueNAS Like a Pro',
      description: 'This is the second post',
      date: '2023-01-02',
      fileName: '2023-01-02-second-post.md',
      imageUrl: '/img/truenas-docker-pro-hero.webp',
    },
    {
      id: '3',
      title: 'Self-Host Your Own Automation Platform with n8n + Docker',
      description: 'This is the third post',
      date: '2023-01-03',
      fileName: '2023-01-03-third-post.md',
      imageUrl: '/img/n8n-self-hosted-hero.webp',
    },
  ]);

  markdownPosts = signal<Record<string, string>>({});

  getPosts() {
    this.postsApiState.update((state) => ({
      ...state,
      loading: true,
      firstLoad: false,
    }));

    const content: Post[] = this.content();

    const data = {
      content,
      page: {
        size: content.length,
        number: 10,
        totalElements: content.length,
        totalPages: content.length % 10,
      },
    };

    setTimeout(() => {
      this.postsApiState.update((state) => ({
        ...state,
        loading: false,
        data,
      }));
    }, Math.random() * 800 + 200);
  }

  getPostById(id: string) {
    const content = this.content();
    return of(content.find((post) => post.id === id));
  }

  getPostMdByFileName(fileName: string) {
    return this.http.get(`/posts/${fileName}`, { responseType: 'text' }).pipe(
      tap((content) => {
        return content
          .split('\n')
          .filter((line) => line.trim() !== '')
          .join('\n');
      })
    );
  }

  fetchMarkdownPosts() {
    this.postFileNames().forEach((file) => {
      if (!this.markdownPosts()[file]) {
        this.http
          .get(`/posts/${file}`, { responseType: 'text' })
          .subscribe((content) => {
            this.markdownPosts.update((current) => ({
              ...current,
              [file]: content
                .split('\n')
                .filter((line) => line.trim() !== '')
                .join('\n'),
            }));
          });
      }
    });
  }

  parsePostData(content: string) {
    const markedHtml = marked.parse(content, { async: false });
    return DOMPurify.sanitize(markedHtml);
  }
}
