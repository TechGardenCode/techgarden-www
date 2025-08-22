import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-nav',
  imports: [],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'w-64 bg-stone-100 h-full border-r border-stone-400',
  },
})
export class Nav {}
