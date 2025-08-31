import { Component, inject, OnInit, signal } from '@angular/core';
import { Header } from '../../../components/shared/header/header';
import { Footer } from '../../../components/shared/footer/footer';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Anchor } from '../../../components/tmp/anchor/anchor';
import { SeedH1 } from '@seed/typography';
import { PostGroup } from '../../../components/tmp/post/post-group/post-group';
import { PostsService } from '../../../services/posts.service';
import { HeaderService } from '../../../services/header.service';
import { BlogService } from '../../../services/api/blog.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-posts.page',
  imports: [RouterModule, Anchor, PostGroup, SeedH1, DatePipe],
  templateUrl: './posts.page.html',
  styleUrl: './posts.page.css',
})
export class PostsPage implements OnInit {
  protected readonly headerService = inject(HeaderService);
  protected readonly blogService = inject(BlogService);
  protected readonly postsService = inject(PostsService);
  protected readonly activatedRoute = inject(ActivatedRoute);
  postContents = signal<{ fragment: string; title: string; tag: string }[]>([]);

  post = signal<any>(undefined);

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
    this.blogService.getPostById(postId).subscribe({
      next: (post: any) => {
        this.post.set(post);
        this.mdPost.set(post.body.content || '');
        this.headerService.addBreadcrumb({
          label: post.metadata.title,
          url: `/${postId}`,
        });
      },
    });
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
