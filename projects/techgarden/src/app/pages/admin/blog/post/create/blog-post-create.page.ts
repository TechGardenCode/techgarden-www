import { Component, inject, signal, ViewEncapsulation } from '@angular/core';
import { BlogEditor } from '../../../../../components/shared/blog-editor/blog-editor';
import { DeepPartial, Post2 } from '@seed/models';
import { Router } from '@angular/router';
import { BlogService } from '../../../../../services/api/blog.service';

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
