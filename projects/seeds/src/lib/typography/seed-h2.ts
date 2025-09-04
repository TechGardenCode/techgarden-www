import { Directive } from '@angular/core';

@Directive({
  selector: '[seedH2]',
  host: {
    class: 'text-2xl font-medium',
  },
})
export class SeedH2 {}
