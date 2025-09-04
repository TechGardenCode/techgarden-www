import { Directive } from '@angular/core';

@Directive({
  selector: '[seedH1]',
  host: {
    class: 'text-3xl font-semibold',
  },
})
export class SeedH1 {}
