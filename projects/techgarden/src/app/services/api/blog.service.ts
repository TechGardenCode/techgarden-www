import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Page, Page2 } from '@seed/models/page.model';
import { PostMetadata } from '../../models/post-metadata.model';
import { tap } from 'rxjs';
import { ApiState } from '@seed/models/api-state.model';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  protected readonly http = inject(HttpClient);

  postMetadataApiState = signal<ApiState<Page2<PostMetadata>>>({
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
      .get<Page2<PostMetadata>>(`/api/blog/posts/metadata`, {
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
    return this.http.get(`/api/blog/posts/${id}`);
  }
}
