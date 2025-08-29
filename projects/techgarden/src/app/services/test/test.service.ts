import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Page } from '@seed/models/page.model';
import { PostMetadata } from '../../models/post-metadata.model';
import { tap } from 'rxjs';
import { ApiState } from '@seed/models/api-state.model';

@Injectable({
  providedIn: 'root',
})
export class TestService {
  protected readonly http = inject(HttpClient);

  createPost(blogForm: any) {
    return this.http.post('/api/blog/posts', blogForm);
  }
}
