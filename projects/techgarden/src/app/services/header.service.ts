import { inject, Injectable, signal } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { BreadcrumbDto } from '@seed/models';

@Injectable({
  providedIn: 'root',
})
export class HeaderService {
  protected readonly title = inject(Title);

  readonly TITLE_PREFIX = 'Techgarden - ';
  readonly TITLE_SUFFIX = ' | Techgarden';
  readonly DEFAULT_BREADCRUMBS = [
    {
      label: 'Home',
      url: '/',
    },
  ];

  readonly breadcrumbs = signal<BreadcrumbDto[]>(this.DEFAULT_BREADCRUMBS);

  defaultBreadcrumbs() {
    this.breadcrumbs.set(this.DEFAULT_BREADCRUMBS);
    this.setTitle();
  }

  setBreadcrumbs(
    breadcrumbs: BreadcrumbDto[],
    config = { withDefaults: false }
  ) {
    if (config.withDefaults) {
      breadcrumbs = [...this.DEFAULT_BREADCRUMBS, ...breadcrumbs];
    }
    this.breadcrumbs.set(breadcrumbs);
    this.setTitle();
  }

  addBreadcrumb(breadcrumb: BreadcrumbDto) {
    this.breadcrumbs.update((breadcrumbs) => [...breadcrumbs, breadcrumb]);
    this.setTitle();
  }

  setTitle(config = { withPrefix: false, withSuffix: true }) {
    const breadcrumbs = this.breadcrumbs();
    if (breadcrumbs.length) {
      let title = breadcrumbs[breadcrumbs.length - 1].label;
      if (config.withPrefix) {
        title = this.TITLE_PREFIX + title;
      }
      if (config.withSuffix) {
        title = title + this.TITLE_SUFFIX;
      }
      this.title.setTitle(title);
    }
  }
}
