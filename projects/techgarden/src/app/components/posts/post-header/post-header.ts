import { DatePipe, KeyValuePipe } from '@angular/common';
import {
  Component,
  computed,
  effect,
  inject,
  input,
  OnInit,
  signal,
} from '@angular/core';
import { PostMetadata } from '@seed/models';
import { SeedH1 } from '@seed/typography';
import { AuthService } from '../../../services/auth/auth.service';
import { HlmButton } from '@spartan-ng/helm/button';
import { RouterModule } from '@angular/router';
import { ReactionService } from '../../../services/api/reaction.service';
import { catchError, EMPTY } from 'rxjs';

@Component({
  selector: 'app-post-header',
  imports: [DatePipe, SeedH1, HlmButton, RouterModule, KeyValuePipe],
  templateUrl: './post-header.html',
  styleUrl: './post-header.css',
})
export class PostHeader implements OnInit {
  postMetadata = input<PostMetadata>();
  authService = inject(AuthService);
  reactionService = inject(ReactionService);
  reactionTypes = {
    LIKE: '❤️',
    UNICORN: '🦄',
    MIND_BLOWN: '🤯',
    PARTY: '🎉',
    FIRE: '🔥',
  };
  reactions = signal<Record<string, number>>({
    LIKE: 0,
    UNICORN: 0,
    MIND_BLOWN: 0,
    PARTY: 0,
    FIRE: 0,
  });
  userReactions = signal<Record<string, boolean>>({
    LIKE: false,
    UNICORN: false,
    MIND_BLOWN: false,
    PARTY: false,
    FIRE: false,
  });

  canUserEdit = computed(() => {
    return (
      this.authService.authenticated() &&
      this.authService.sub() === this.postMetadata()?.author?.sub
    );
  });

  constructor() {
    effect(() => {
      const postId = this.postMetadata()?.id;
      if (!postId) {
        throw new Error('postId is required');
      }
    });
  }

  ngOnInit() {
    const postId = this.postMetadata()?.id as string;
    this.reactionService.getReactionsCountForPost(postId).subscribe({
      next: (counts) => {
        this.reactions.update((current) => ({ ...current, ...counts }));
      },
    });
    this.reactionService
      .getUserReactionsCountForPost(postId)
      .pipe(catchError(() => EMPTY))
      .subscribe({
        next: (userReactions) => {
          const reactions: Record<string, boolean> = {};
          userReactions.forEach((reaction) => {
            reactions[reaction] = true;
          });
          this.userReactions.update((userReactions) => ({
            ...userReactions,
            ...reactions,
          }));
        },
      });
  }

  toggleReaction(reactionType: string) {
    const hasReacted = this.userReactions()[reactionType];
    if (hasReacted) {
      this.updateReactionCount(reactionType, false);
      this.removeReaction(reactionType);
    } else {
      this.updateReactionCount(reactionType, true);
      this.addReaction(reactionType);
    }
    this.userReactions.update((current) => ({
      ...current,
      [reactionType]: !hasReacted,
    }));
  }

  updateReactionCount(reactionType: string, increment: boolean) {
    this.reactions.update((current) => ({
      ...current,
      [reactionType]: (current[reactionType] || 0) + (increment ? 1 : -1),
    }));
  }

  addReaction(reactionType: string) {
    const postId = this.postMetadata()?.id as string;
    this.reactionService.reactToPost(postId, reactionType).subscribe();
  }

  removeReaction(reactionType: string) {
    const postId = this.postMetadata()?.id as string;
    this.reactionService.removeReaction(postId, reactionType).subscribe();
  }
}
