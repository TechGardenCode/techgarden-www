import { Directive } from '@angular/core';

@Directive({
  selector: '[seedH2]',
  host: {
    class: 'text-2xl',
  },
})
export class SeedH2 {

  constructor() { }

}
