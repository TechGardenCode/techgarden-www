import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Page, Reaction } from '@seed/models';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  protected readonly http = inject(HttpClient);
  protected readonly authService = inject(AuthService);

  getCommentsForPost(postId: string) {
    return this.http.get<Page<Reaction>>(
      `/api/blog/reactions/posts/${postId}/comments`
    );
  }

  addCommentToPost(postId: string, content: string) {
    return this.http.post<Reaction>(`/api/blog/reactions/posts/${postId}/comments`, null, { params: { content } });
  }

  deleteCommentFromPost(postId: string, commentId: string) {
    return this.http.delete<void>(`/api/blog/reactions/posts/${postId}/comments/${commentId}`);
  }
}
