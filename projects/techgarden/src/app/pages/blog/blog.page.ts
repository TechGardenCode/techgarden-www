import { Component, computed, inject, OnInit } from '@angular/core';
import { HeaderService } from '../../services/header.service';
import { PostsService } from '../../services/posts.service';
import { RouterModule } from '@angular/router';
import { Footer } from "../../components/shared/footer/footer";
import { Anchor } from "../../components/tmp/anchor/anchor";

@Component({
  selector: 'app-blog.page',
  imports: [RouterModule, Footer, Anchor],
  templateUrl: './blog.page.html',
  styleUrl: './blog.page.css',
})
export class BlogPage implements OnInit {
  postsService = inject(PostsService);

  posts = this.postsService.markdownPosts;
  postsApiState = computed(() => this.postsService.postsApiState());
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
    this.postsService.getPosts();
    this.postsService.fetchMarkdownPosts();
  }
}
