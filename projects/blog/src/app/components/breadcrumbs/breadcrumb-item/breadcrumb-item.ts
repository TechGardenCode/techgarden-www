import { Directive } from '@angular/core';

@Directive({
  selector: '[appBreadcrumbItem]',
  host: {
    class: 'inline-flex items-center gap-1.5',
  },
})
export class BreadcrumbItem {
  constructor() {}
}
