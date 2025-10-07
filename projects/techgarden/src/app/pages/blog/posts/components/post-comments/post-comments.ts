import {
  Component,
  effect,
  inject,
  input,
  OnInit,
  signal,
} from '@angular/core';
import { SeedH1 } from '@seed/typography';
import { HlmInput } from '@spartan-ng/helm/input';
import { HlmAvatar, HlmAvatarFallback, HlmAvatarImage } from '@spartan-ng/helm/avatar';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HlmButton } from '@spartan-ng/helm/button';
import { PostComment } from '../post-comment/post-comment';
import { PostCommentModel } from '@seed/models';

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
    class: 'flex flex-col gap-6 mb-4',
    id: 'blog-post-comments',
  },
})
export class PostComments implements OnInit {
  fb = inject(FormBuilder);

  postId = input<string>();
  comments = signal<PostCommentModel[]>([]);
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
    this.comments.set([
      {
        id: '1',
        content: 'This is a great post! Thanks for sharing.',
        author: { sub: '2', displayName: 'Jane Doe' },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ]);
  }

  shouldShowCommentFormSubmitButton(focused: boolean) {
    const value = this.commentForm.get('comment')?.value;
    this.showCommentFormSubmitButton.set(focused || !!value);
  }
}
