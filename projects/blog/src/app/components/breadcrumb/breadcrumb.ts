import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-breadcrumb',
  imports: [RouterModule],
  templateUrl: './breadcrumb.html',
  styleUrl: './breadcrumb.css',
})
export class Breadcrumb {
  breadcrumbItems = input<{ url: string; label: string }[]>([]);
}
