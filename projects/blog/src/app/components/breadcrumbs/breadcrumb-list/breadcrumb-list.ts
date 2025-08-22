import { Directive } from '@angular/core';

@Directive({
  selector: '[appBreadcrumbList]',
  host: {
    class: 'flex flex-wrap items-center gap-1.5 text-sm break-words sm:gap-2.5',
  },
})
export class BreadcrumbList {
  constructor() {}
}
