import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable } from '@angular/core';
import { signal } from '@angular/core';

type Post = {
  id: number;
  title: string;
  description: string;
  date: string;
};

@Injectable({
  providedIn: 'root',
})
export class Posts {
  posts = signal<Post[]>([
    {
      id: 1,
      title: 'First Post',
      description: 'This is the first post',
      date: '2023-01-01',
    },
    {
      id: 2,
      title: 'Second Post',
      description: 'This is the second post',
      date: '2023-01-02',
    },
    {
      id: 3,
      title: 'Third Post',
      description: 'This is the third post',
      date: '2023-01-03',
    },
  ]);

  private http = inject(HttpClient);

  postFileNames = signal<string[]>(['2025-06-15-immich-self-hosted.md']);

  markdownPosts = signal<Record<string, string>>({});

  fetchMarkdownPosts() {
    this.postFileNames().forEach((file) => {
      if (!this.markdownPosts()[file]) {
        this.http
          .get(`/posts/${file}`, { responseType: 'text' })
          .subscribe((content) => {
            this.markdownPosts.update((current) => ({
              ...current,
              [file]: this.parsePostData(content),
            }));
          });
      }
    });
  }

  parsePostData(content: string) {
    let out: string[] = [];
    let split = content.split('\n').filter((line) => line.trim() !== '');
    for (let i = 0; i < split.length; i++) {
      if (split[i].startsWith('---')) {
        const endIndex = split.indexOf('---', i + 1);
        if (endIndex !== -1) {
          i = endIndex;
          continue;
        }
      }
      if (split[i].startsWith('```')) {
        const endIndex = split.indexOf('```', i + 1);
        if (endIndex !== -1) {
          const codeBlock = split.slice(i + 1, endIndex);
          console.log(codeBlock);
          out.push('<pre><code>' + codeBlock.join('\n') + '</code></pre>');
          i = endIndex;
          continue;
        }
        continue;
      }
      if (split[i].startsWith('- ')) {
        const startIndex = i;
        while (split[i + 1] && split[i + 1].startsWith('- ')) {
          i++;
        }
        out.push(
          '<ul><li>' +
            split
              .slice(startIndex, i + 1)
              .map((item) => item.slice(2))
              .join('</li><li>') +
            '</li></ul>'
        );
        continue;
      }
      if (split[i].startsWith('{%')) {
        continue;
      }
      // defaults
      if (split[i].startsWith('### ')) {
        out.push('<h3>' + split[i].slice(4) + '</h3>');
        continue;
      }
      if (split[i].startsWith('## ')) {
        out.push('<h2>' + split[i].slice(3) + '</h2>');
        continue;
      }
      if (split[i].startsWith('# ')) {
        out.push('<h1>' + split[i].slice(2) + '</h1>');
      } else {
        out.push('<p>' + split[i] + '</p>');
      }
    }
    console.log(out);
    return out.join('\n');
  }
}
