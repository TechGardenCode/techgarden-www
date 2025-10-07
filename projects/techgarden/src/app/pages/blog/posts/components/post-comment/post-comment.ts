import { Component, input, signal } from '@angular/core';
import { PostCommentModel } from '@seed/models';
import { HlmAvatar, HlmAvatarFallback } from '@spartan-ng/helm/avatar';
import { HlmButton } from '@spartan-ng/helm/button';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideChevronsDownUp, lucideChevronsUpDown, lucideMessageCircle, lucideShare2, lucideThumbsUp } from '@ng-icons/lucide';
import { HlmIcon } from '@spartan-ng/helm/icon';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-post-comment',
  imports: [HlmAvatar, HlmAvatarFallback, HlmButton, NgIcon, HlmIcon, DatePipe],
  providers: [provideIcons({ lucideChevronsUpDown, lucideChevronsDownUp, lucideThumbsUp, lucideMessageCircle, lucideShare2 })],
  templateUrl: './post-comment.html',
  styleUrl: './post-comment.css',
})
export class PostComment {
  comment = input<PostCommentModel>();
  collapsed = signal(false);
}
