import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class ReactionService {
  protected readonly http = inject(HttpClient);
  protected readonly authService = inject(AuthService);

  getReactionsCountForPost(postId: string) {
    return this.http.get<Record<string, number>>(
      `/api/blog/reactions/posts/${postId}/count`
    );
  }

  getUserReactionsCountForPost(postId: string) {
    return this.http.get<string[]>(
      `/api/blog/reactions/posts/${postId}/user-count`
    );
  }

  reactToPost(postId: string, reactionType: string) {
    const queryParams = { reactionType };
    return this.http.post<void>(`/api/blog/reactions/posts/${postId}`, null, {
      params: queryParams,
    });
  }

  removeReaction(postId: string, reactionType: string) {
    const queryParams = { reactionType };
    return this.http.delete<void>(`/api/blog/reactions/posts/${postId}`, {
      params: queryParams,
    });
  }
}
