import { Component, model, ViewEncapsulation } from '@angular/core';

import {
  SeedPagination,
  SeedPaginationContent,
  SeedPaginationItem,
  SeedPaginationPrevious,
  SeedPaginationNext,
  SeedPaginationLink,
  SeedPaginationEllipsis,
} from '@seed/pagination';
import { Page } from '@seed/models';

@Component({
  selector: 'app-pagination',
  imports: [
    SeedPagination,
    SeedPaginationContent,
    SeedPaginationItem,
    SeedPaginationPrevious,
    SeedPaginationNext,
    SeedPaginationLink,
    SeedPaginationEllipsis,
  ],
  templateUrl: './pagination.html',
  styleUrl: './pagination.css',
  encapsulation: ViewEncapsulation.None,
})
export class Pagination {
  page = model<Page<unknown> | undefined>({
    content: [],
    pageable: {
      pageNumber: 0,
      pageSize: 10,
      sort: {
        empty: true,
        unsorted: true,
        sorted: false,
      },
      offset: 0,
      unpaged: false,
      paged: true,
    },
    last: false,
    totalElements: 0,
    totalPages: 0,
    first: false,
    size: 10,
    sort: {
      empty: true,
      unsorted: true,
      sorted: false,
    },
    numberOfElements: 0,
    empty: true,
    number: 0,
  });

  setPageNumber(pageNumber: number) {
    const page = this.page();
    if (
      !page ||
      pageNumber === page?.number ||
      pageNumber < 0 ||
      pageNumber >= (page?.totalPages || 0)
    ) {
      return;
    }
    this.page.update(() => ({ ...page, number: pageNumber }));
  }
}
