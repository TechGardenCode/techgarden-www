import { Component, inject, signal, ViewEncapsulation } from '@angular/core';
import { BlogEditor } from '../../../../../components/shared/blog-editor/blog-editor';
import { DeepPartial, Post2 } from '@seed/models';
import { Router } from '@angular/router';
import { BlogService } from '../../../../../services/api/blog.service';
import { HeaderService } from '../../../../../services/header.service';

@Component({
  selector: 'app-blog-post-create.page',
  imports: [BlogEditor],
  templateUrl: './blog-post-create.page.html',
  styleUrl: './blog-post-create.page.css',
  encapsulation: ViewEncapsulation.None,
})
export class BlogPostCreatePage {
  router = inject(Router);
  blogService = inject(BlogService);
  headerService = inject(HeaderService);

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
        {
          label: 'Create post',
          url: '/admin/blog/create',
        },
      ],
      {
        withDefaults: true,
      }
    );
  }

  onSubmit({
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
    const post: DeepPartial<Post2> = {
      metadata: {
        title,
        description,
        imageUrl,
      },
      body: {
        content,
      },
    };
    this.blogService.createPost(post).subscribe({
      next: (post) => {
        this.router.navigate(['/blog/', post.id]);
      },
    });
  }
}
