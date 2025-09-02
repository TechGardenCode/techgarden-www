import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { PostMetadata } from '../../models/post-metadata.model';
import { delay, tap } from 'rxjs';
import { ApiState, DeepPartial, Page, Post, Post2 } from '@seed/models';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  protected readonly http = inject(HttpClient);
  protected readonly authService = inject(AuthService);

  postMetadataApiState = signal<ApiState<Page<PostMetadata>>>({
    loading: false,
    error: null,
    firstLoad: true,
  });

  getPostMetadata({
    page = 0,
    size = 10,
  }: {
    page?: number;
    size?: number;
  } = {}) {
    this.postMetadataApiState.update((state) => ({
      ...state,
      loading: true,
    }));
    return this.http
      .get<Page<PostMetadata>>(`/api/blog/posts/metadata`, {
        params: { page, size },
      })
      .pipe(
        tap({
          next: (response) => {
            this.postMetadataApiState.update((state) => ({
              ...state,
              loading: false,
              error: null,
              firstLoad: false,
              data: {
                ...response,
                number:
                  response.number > response.totalPages
                    ? response.totalPages - 1
                    : response.number,
              },
              updatedAt: new Date(),
            }));
          },
          error: (error) => {
            this.postMetadataApiState.update((state) => ({
              ...state,
              loading: false,
              error: error,
              firstLoad: false,
            }));
          },
        })
      )
      .subscribe();
  }

  getPostById(id: string) {
    return this.http.get<Post2>(`/api/blog/posts/${id}`);
  }

  createPost(post: DeepPartial<Post2>) {
    post = {
      ...post,
      metadata: { ...post.metadata, author: this.authService.user().fullName },
    };
    return this.http.post<Post2>(`/api/blog/posts`, post);
  }

  savePost(post: DeepPartial<Post2>) {
    post = {
      ...post,
      metadata: { ...post.metadata, author: this.authService.user().fullName },
    };
    return this.http.put<Post2>(`/api/blog/posts/${post.id}`, post);
  }
}
