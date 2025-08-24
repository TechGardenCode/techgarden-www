import { Directive } from '@angular/core';

@Directive({
  selector: '[seedH3]',
  host: {
    class: 'text-xl mt-6 mb-4',
  },
})
export class SeedH3 {

  constructor() { }

}
