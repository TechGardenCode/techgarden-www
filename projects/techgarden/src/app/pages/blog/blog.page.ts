import { Component, computed, inject } from '@angular/core';
import { HeaderService } from '../../services/header.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Anchor } from '../../components/tmp/anchor/anchor';
import { BlogService } from '../../services/api/blog.service';
import { DatePipe } from '@angular/common';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideCalendar } from '@ng-icons/lucide';
import { Pagination } from '../../components/shared/pagination/pagination';
import { Page } from '@seed/models';

@Component({
  selector: 'app-blog.page',
  imports: [RouterModule, Anchor, DatePipe, NgIcon, Pagination],
  providers: [provideIcons({ lucideCalendar })],
  templateUrl: './blog.page.html',
  styleUrl: './blog.page.css',
})
export class BlogPage {
  protected readonly blogService = inject(BlogService);
  protected readonly router = inject(Router);
  protected readonly activatedRoute = inject(ActivatedRoute);
  protected readonly headerService = inject(HeaderService);

  postsApiState = computed(() => this.blogService.postMetadataApiState());
  breadcrumbItems = [{ url: '/', label: 'Home' }];
  page = computed(() => {
    let number = this.postsApiState().data?.number;
    if (number === undefined) {
      number = 0;
    }
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: {
        page: number + 1,
      },
      queryParamsHandling: 'merge',
    });
    return number;
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
    this.activatedRoute.queryParams.subscribe(({ page }) => {
      if (!page) {
        page = 1;
      }
      this.blogService.getPostMetadata({ page: page - 1 });
    });
  }

  onPageChange(event?: Page<unknown>) {
    if (!event) {
      return;
    }
    if (event.number !== this.page()) {
      this.router.navigate([], {
        relativeTo: this.activatedRoute,
        queryParams: {
          page: event.number + 1,
        },
        queryParamsHandling: 'merge',
      });
      this.blogService.getPostMetadata({
        page: event.number,
      });
    }
  }
}
