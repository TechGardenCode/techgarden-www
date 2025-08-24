import { Directive } from '@angular/core';

@Directive({
  selector: '[seedH2]',
  host: {
    class: 'text-2xl mt-8 mb-6',
  },
})
export class SeedH2 {

  constructor() { }

}
