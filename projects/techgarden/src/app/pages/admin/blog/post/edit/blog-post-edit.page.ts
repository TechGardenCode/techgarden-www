import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { BlogEditor } from '../../../../../components/shared/blog-editor/blog-editor';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from '../../../../../services/api/blog.service';
import { Post2 } from '@seed/models';
import { HeaderService } from '../../../../../services/header.service';

@Component({
  selector: 'app-blog-post-edit.page',
  imports: [BlogEditor],
  templateUrl: './blog-post-edit.page.html',
  styleUrl: './blog-post-edit.page.css',
})
export class BlogPostEditPage implements OnInit {
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  blogService = inject(BlogService);
  headerService = inject(HeaderService);

  post = signal<Post2 | undefined>(undefined);

  constructor() {
    this.headerService.setBreadcrumbs(
      [
        {
          label: 'Admin',
          url: '/admin',
        },
        {
          label: 'Blog',
          url: '/admin/blog',
        },
      ],
      {
        withDefaults: true,
      }
    );
    effect(() => {
      const postId = this.activatedRoute.snapshot.paramMap.get('postId');
      if (!postId) {
        throw new Error('Post Id is required');
      }
    });
  }

  ngOnInit(): void {
    const postId = this.activatedRoute.snapshot.paramMap.get(
      'postId'
    ) as string;
    this.blogService.getPostById(postId).subscribe((post) => {
      this.post.set(post);
      this.headerService.addBreadcrumb({
        label: `Edit post`,
        url: `/admin/blog/edit/${post.id}`,
      });
    });
  }

  postSubmit({
    title,
    description,
    imageUrl,
    content,
  }: {
    title: string;
    description: string;
    imageUrl: string;
    content: string;
  }) {
    if (!this.post()) {
      return;
    }
    this.post.update((post) => {
      post = post as Post2;
      return {
        ...post,
        metadata: {
          ...post.metadata,
          title,
          description,
          imageUrl,
        },
        body: {
          ...post.body,
          content,
        },
      };
    });
    this.blogService.savePost(this.post() as Post2).subscribe({
      next: () => {
        this.router.navigate(['/blog/', this.post()?.id]);
      },
    });
  }
}
