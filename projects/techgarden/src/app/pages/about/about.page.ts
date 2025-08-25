import { Component, inject } from '@angular/core';
import { HeaderService } from '../../services/header.service';

@Component({
  selector: 'app-about.page',
  imports: [],
  templateUrl: './about.page.html',
  styleUrl: './about.page.css',
})
export class AboutPage {
  protected readonly headerService = inject(HeaderService);

  constructor() {
    this.headerService.setBreadcrumbs(
      [
        {
          label: 'About',
          url: '/about',
        },
      ],
      {
        withDefaults: true,
      }
    );
  }
}
