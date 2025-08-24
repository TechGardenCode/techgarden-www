import { Directive } from '@angular/core';

@Directive({
  selector: '[seedH1]',
  host: {
    class: 'text-3xl mt-10 mb-8',
  },
})
export class SeedH1 {
  constructor() {}
}
