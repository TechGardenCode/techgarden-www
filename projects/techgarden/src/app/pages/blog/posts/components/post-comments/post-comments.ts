import {
  Component,
  computed,
  effect,
  inject,
  input,
  OnInit,
  signal,
} from '@angular/core';
import { SeedH1 } from '@seed/typography';
import { HlmInput } from '@spartan-ng/helm/input';
import {
  HlmAvatar,
  HlmAvatarFallback,
  HlmAvatarImage,
} from '@spartan-ng/helm/avatar';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HlmButton } from '@spartan-ng/helm/button';
import { PostComment } from '../post-comment/post-comment';
import { Reaction } from '@seed/models';
import { CommentsService } from '../../../../../services/api/comments.service';
import { AuthService } from '../../../../../services/auth/auth.service';

@Component({
  selector: 'app-post-comments',
  imports: [
    SeedH1,
    HlmInput,
    HlmAvatar,
    HlmAvatarFallback,
    HlmAvatarImage,
    ReactiveFormsModule,
    HlmButton,
    PostComment,
  ],
  templateUrl: './post-comments.html',
  styleUrl: './post-comments.css',
  host: {
    class: 'flex flex-col gap-6 mb-4 max-w-[800px]',
    id: 'blog-post-comments',
  },
})
export class PostComments implements OnInit {
  fb = inject(FormBuilder);
  commentsService = inject(CommentsService);
  authService = inject(AuthService);
  monogram = computed(
    () =>
      this.authService
        .user()
        ?.fullName.split(' ')
        .map((n) => n[0])
        .join('') ?? ''
  );

  postId = input<string>();
  comments = signal<Reaction[]>([]);
  commentForm = this.fb.group({
    comment: new FormControl('', [Validators.required]),
  });

  showCommentFormSubmitButton = signal(false);

  constructor() {
    effect(() => {
      if (!this.postId()) {
        throw new Error('postId is required for PostComments component');
      }
    });
  }

  ngOnInit() {
    this.commentsService
      .getCommentsForPost(this.postId() as string)
      .subscribe((comments) => {
        this.comments.set(comments.content);
      });
  }

  shouldShowCommentFormSubmitButton(focused: boolean) {
    const value = this.commentForm.get('comment')?.value;
    this.showCommentFormSubmitButton.set(focused || !!value);
  }

  submitForm() {
    if (this.commentForm.valid && this.commentForm.controls.comment.valid) {
      const content = this.commentForm.controls.comment.value as string;
      this.commentsService
        .addCommentToPost(this.postId() as string, content)
        .subscribe({
          next: (comment) => {
            this.commentForm.reset();
            this.showCommentFormSubmitButton.set(false);
            this.comments.update((comments) => [comment, ...comments]);
          },
        });
    }
  }
}
