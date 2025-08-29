import { Component, computed, inject, OnInit } from '@angular/core';
import { HeaderService } from '../../services/header.service';
import { PostsService } from '../../services/posts.service';
import { RouterModule } from '@angular/router';
import { Anchor } from '../../components/tmp/anchor/anchor';
import { BlogService } from '../../services/api/blog.service';
import { DatePipe } from '@angular/common';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideCalendar } from '@ng-icons/lucide';
import { Pagination } from '../../components/shared/pagination/pagination';
import { Page2 } from '@seed/models/page.model';
import { PostMetadata } from '../../models/post-metadata.model';

@Component({
  selector: 'app-blog.page',
  imports: [RouterModule, Anchor, DatePipe, NgIcon, Pagination],
  providers: [provideIcons({ lucideCalendar })],
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

  onPageChange(event?: Page2<unknown>) {
    console.log(event);
    if (!event) {
      return;
    }
    this.blogService.getPostMetadata({
      page: event.number,
      size: event.size,
    });
  }
}
