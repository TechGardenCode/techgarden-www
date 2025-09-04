import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Anchor } from '../../../components/tmp/anchor/anchor';
import { SeedH1 } from '@seed/typography';
import { HeaderService } from '../../../services/header.service';
import { BlogService } from '../../../services/api/blog.service';
import { DatePipe } from '@angular/common';
import { ApiState, Post2, PostBodyJson } from '@seed/models';
import { PostSection2 } from '../../../components/tmp/post/post-section-2/post-section';

@Component({
  selector: 'app-posts.page',
  imports: [RouterModule, Anchor, SeedH1, DatePipe, PostSection2],
  templateUrl: './posts.page.html',
  styleUrl: './posts.page.css',
})
export class PostsPage implements OnInit {
  protected readonly headerService = inject(HeaderService);
  protected readonly blogService = inject(BlogService);
  protected readonly activatedRoute = inject(ActivatedRoute);

  postContents = signal<{ fragment: string; title: string; tag: string }[]>([]);
  breadcrumbItems = [{ url: '/', label: 'Home' }];

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
        this.headerService.addBreadcrumb({
          label: post.metadata.title,
          url: `/${postId}`,
        });
        this.parsePostBodyJsonToAnchor(post.postBodyJson || []);
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

  parsePostBodyJsonToAnchor(postBodyJson: PostBodyJson[]) {
    this.postContents.set(
      postBodyJson
        .filter(
          (section) =>
            section.type === 'HEADING' && ['h2', 'h3'].includes(section.subtype)
        )
        .map((section) => ({
          fragment: this.parseFragment(section.text),
          title: section.text,
          tag: section.subtype,
        }))
    );
  }

  parseFragment(fragment: string) {
    return `section-${fragment.replace(/\s+/g, '-').toLowerCase()}`;
  }
}
