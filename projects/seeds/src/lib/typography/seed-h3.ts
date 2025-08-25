import { Directive } from '@angular/core';

@Directive({
  selector: '[seedH3]',
  host: {
    class: 'text-xl',
  },
})
export class SeedH3 {

  constructor() { }

}
