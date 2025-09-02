import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Anchor } from '../../../components/tmp/anchor/anchor';
import { SeedH1 } from '@seed/typography';
import { PostGroup } from '../../../components/tmp/post/post-group/post-group';
import { HeaderService } from '../../../services/header.service';
import { BlogService } from '../../../services/api/blog.service';
import { DatePipe } from '@angular/common';
import { ApiState, Post2 } from '@seed/models';

@Component({
  selector: 'app-posts.page',
  imports: [RouterModule, Anchor, PostGroup, SeedH1, DatePipe],
  templateUrl: './posts.page.html',
  styleUrl: './posts.page.css',
})
export class PostsPage implements OnInit {
  protected readonly headerService = inject(HeaderService);
  protected readonly blogService = inject(BlogService);
  protected readonly activatedRoute = inject(ActivatedRoute);

  postContents = signal<{ fragment: string; title: string; tag: string }[]>([]);
  breadcrumbItems = [{ url: '/', label: 'Home' }];
  mdPost = signal<string>('');

  post2 = signal<ApiState<Post2>>({
    loading: false,
    firstLoad: true,
  });

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
    this.post2.set({
      loading: true,
      firstLoad: false,
    });
    this.blogService.getPostById(postId).subscribe({
      next: (post: Post2) => {
        this.post2.set({
          loading: false,
          firstLoad: false,
          data: post,
        });
        this.mdPost.set(post.body.content || '');
        this.headerService.addBreadcrumb({
          label: post.metadata.title,
          url: `/${postId}`,
        });
      },
      error: (error) => {
        this.post2.set({
          loading: false,
          firstLoad: false,
          error: error,
        });
      },
    });
  }

  parseFragment(fragment: string) {
    return fragment.trim().toLowerCase().split(' ').join('-');
  }
}
