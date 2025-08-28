import { Component, computed, inject, OnInit } from '@angular/core';
import { HeaderService } from '../../services/header.service';
import { PostsService } from '../../services/posts.service';
import { RouterModule } from '@angular/router';
import { Footer } from "../../components/shared/footer/footer";
import { Anchor } from "../../components/tmp/anchor/anchor";
import { BlogService } from '../../services/api/blog.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-blog.page',
  imports: [RouterModule, Anchor, DatePipe],
  templateUrl: './blog.page.html',
  styleUrl: './blog.page.css',
})
export class BlogPage implements OnInit {
  protected readonly postsService = inject(PostsService);
  protected readonly blogService = inject(BlogService);

  posts = this.postsService.markdownPosts;
  postsApiState = computed(() => this.blogService.postMetadataApiState());
  breadcrumbItems = [{ url: '/', label: 'Home' }];

  constructor(private readonly headerService: HeaderService) {
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

  ngOnInit() {
    this.blogService.getPostMetadata();
  }
}
