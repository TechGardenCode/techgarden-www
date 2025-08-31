import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TestService {
  protected readonly http = inject(HttpClient);

  createPost(blogForm: any) {
    return this.http.post('/api/blog/posts', blogForm);
  }
}
