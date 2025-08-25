import { Component, inject } from '@angular/core';
import { HeaderService } from '../../services/header.service';

@Component({
  selector: 'app-home.page',
  imports: [],
  templateUrl: './home.page.html',
  styleUrl: './home.page.css',
})
export class HomePage {
  protected readonly headerService = inject(HeaderService);

  constructor() {
    this.headerService.setBreadcrumbs([], {
      withDefaults: true,
    });
  }
}
