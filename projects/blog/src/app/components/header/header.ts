import { Component, input, ViewEncapsulation } from '@angular/core';
import { Breadcrumb } from "../breadcrumb/breadcrumb";

@Component({
  selector: 'app-header',
  imports: [Breadcrumb],
  templateUrl: './header.html',
  styleUrl: './header.css',
  encapsulation: ViewEncapsulation.None,
})
export class Header {
  breadcrumbItems = input<{ url: string; label: string }[]>([]);
}
