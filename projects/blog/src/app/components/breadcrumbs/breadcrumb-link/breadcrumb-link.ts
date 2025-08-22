import { Directive, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Directive({
  selector: '[appBreadcrumbLink]',
  hostDirectives: [
    {
      directive: RouterLink,
      inputs: [
        'target',
        'queryParams',
        'fragment',
        'queryParamsHandling',
        'state',
        'info',
        'relativeTo',
        'preserveFragment',
        'skipLocationChange',
        'replaceUrl',
        'routerLink: link',
      ],
    },
  ],
  host: {
    class: 'hover:text-foreground transition-colors',
  },
})
export class BreadcrumbLink {
  public readonly link = input<RouterLink['routerLink']>();
}
