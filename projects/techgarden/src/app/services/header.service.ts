import { Injectable, signal } from '@angular/core';
import { BreadcrumbDto } from '@seed/models/breadcrumb.model';

@Injectable({
  providedIn: 'root',
})
export class HeaderService {
  readonly DEFAULT_BREADCRUMBS = [
    {
      label: 'Home',
      url: '/',
    },
  ];

  readonly breadcrumbs = signal<BreadcrumbDto[]>(this.DEFAULT_BREADCRUMBS);

  setBreadcrumbs(
    breadcrumbs: BreadcrumbDto[],
    config = { withDefaults: false }
  ) {
    if (config.withDefaults) {
      breadcrumbs = [...this.DEFAULT_BREADCRUMBS, ...breadcrumbs];
    }
    this.breadcrumbs.set(breadcrumbs);
  }

  addBreadcrumb(breadcrumb: BreadcrumbDto) {
    this.breadcrumbs.update((breadcrumbs) => [...breadcrumbs, breadcrumb]);
  }
}
