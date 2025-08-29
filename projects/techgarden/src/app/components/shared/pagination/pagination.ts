import {
  Component,
  inject,
  input,
  model,
  output,
  ViewEncapsulation,
} from '@angular/core';

import { SeedPagination } from '@seed/components/pagination/seed-pagination';
import { SeedPaginationContent } from '@seed/components/pagination/seed-pagination-content';
import { SeedPaginationItem } from '@seed/components/pagination/seed-pagination-item';
import { SeedPaginationPrevious } from '@seed/components/pagination/seed-pagination-previous';
import { SeedPaginationNext } from '@seed/components/pagination/seed-pagination-next';
import { SeedPaginationLink } from '@seed/components/pagination/seed-pagination-link';
import { SeedPaginationEllipsis } from '@seed/components/pagination/seed-pagination-ellipsis';
import { Page, Page2 } from '@seed/models/page.model';

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
  page = model<Page2<unknown> | undefined>({
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
