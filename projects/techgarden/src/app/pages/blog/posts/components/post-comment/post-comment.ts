import { Component, computed, input, signal } from '@angular/core';
import { Reaction } from '@seed/models';
import {
  HlmAvatar,
  HlmAvatarFallback,
  HlmAvatarImage,
} from '@spartan-ng/helm/avatar';
import { HlmButton } from '@spartan-ng/helm/button';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideChevronsDownUp,
  lucideChevronsUpDown,
  lucideMessageCircle,
  lucideShare2,
  lucideThumbsUp,
} from '@ng-icons/lucide';
import { HlmIcon } from '@spartan-ng/helm/icon';
import { DatePipe } from '@angular/common';
import { SeedH3 } from '@seed/typography';

@Component({
  selector: 'app-post-comment',
  imports: [
    HlmAvatar,
    HlmAvatarFallback,
    HlmButton,
    NgIcon,
    HlmIcon,
    DatePipe,
    HlmAvatarImage,
    SeedH3,
  ],
  providers: [
    provideIcons({
      lucideChevronsUpDown,
      lucideChevronsDownUp,
      lucideThumbsUp,
      lucideMessageCircle,
      lucideShare2,
    }),
  ],
  templateUrl: './post-comment.html',
  styleUrl: './post-comment.css',
})
export class PostComment {
  comment = input<Reaction>();
  monogram = computed(() => {
    return (
      this.comment()
        ?.user?.displayName.split(' ')
        .map((n) => n[0])
        .join('') ?? ''
    );
  });
  collapsed = signal(false);
}
