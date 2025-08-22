import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-anchor',
  imports: [RouterModule],
  templateUrl: './anchor.html',
  styleUrl: './anchor.css',
})
export class Anchor {

  sections = input<any[]>([]);

  parseFragment(fragment: string) {
    return fragment.trim().toLowerCase().split(' ').join('-');
  }
}
