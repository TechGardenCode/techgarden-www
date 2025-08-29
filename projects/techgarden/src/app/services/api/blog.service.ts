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

  getPostMetadata(
    {
      page,
      size,
    }: {
      page: number;
      size: number;
    } = { page: 0, size: 10 }
  ) {
    // const now = new Date();
    // const updatedAt = this.postMetadataApiState().updatedAt;
    // if (updatedAt && now.getTime() - updatedAt.getTime() < 5 * 1000) {
    //   return;
    // }
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
              data: response,
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
