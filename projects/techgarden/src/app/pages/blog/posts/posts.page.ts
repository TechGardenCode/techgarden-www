import { Component, inject, OnInit, signal } from '@angular/core';
import { Header } from '../../../components/shared/header/header';
import { Footer } from '../../../components/shared/footer/footer';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Anchor } from '../../../components/tmp/anchor/anchor';
import { SeedH1 } from '@seed/typography/seed-h1';
import { PostGroup } from '../../../components/tmp/post/post-group/post-group';
import { PostsService } from '../../../services/posts.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Post } from '@seed/models/post.model';
import { HeaderService } from '../../../services/header.service';

@Component({
  selector: 'app-posts.page',
  imports: [RouterModule, Anchor, PostGroup, SeedH1],
  templateUrl: './posts.page.html',
  styleUrl: './posts.page.css',
})
export class PostsPage implements OnInit {
  headerService = inject(HeaderService);
  postsService = inject(PostsService);
  sanitizer = inject(DomSanitizer);
  activatedRoute = inject(ActivatedRoute);
  postContents = signal<{ fragment: string; title: string; tag: string }[]>([]);

  post = signal<Post | undefined>(undefined);

  breadcrumbItems = [{ url: '/', label: 'Home' }];

  mdPost = signal<string>('');

  constructor() {
    this.headerService.setBreadcrumbs(
      [
        {
          label: 'Blog',
          url: '/blog',
        },
      ],
      {
        withDefaults: true,
      }
    );
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      const postId = params['postId'];
      this.getPostById(postId);
    });
  }

  getPostById(postId: string) {
    this.postsService.getPostById(postId).subscribe((post) => {
      if (!post) {
        return;
      }
      this.post.set(post);
      this.getPostMdByFileName(post.fileName);
      this.headerService.addBreadcrumb({
        label: post.title,
        url: `/${postId}`,
      });
    });
  }

  getPostMdByFileName(fileName: string) {
    this.postsService.getPostMdByFileName(fileName).subscribe((content) => {
      this.mdPost.set(content);
    });
  }

  parseFragment(fragment: string) {
    return fragment.trim().toLowerCase().split(' ').join('-');
  }
}
