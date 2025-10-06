import { DatePipe } from '@angular/common';
import { Component, computed, inject, input } from '@angular/core';
import { PostMetadata } from '@seed/models';
import { SeedH1 } from '@seed/typography';
import { AuthService } from '../../../services/auth/auth.service';
import { HlmButton } from '@spartan-ng/helm/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-post-header',
  imports: [DatePipe, SeedH1, HlmButton, RouterModule],
  templateUrl: './post-header.html',
  styleUrl: './post-header.css',
})
export class PostHeader {
  postMetadata = input<PostMetadata>();
  authService = inject(AuthService);
  canUserEdit = computed(() => {
    return (
      this.authService.authenticated() &&
      this.authService.sub() === this.postMetadata()?.author?.sub
    );
  });
}
