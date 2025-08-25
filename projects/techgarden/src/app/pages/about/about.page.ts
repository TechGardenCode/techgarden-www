import { Component, computed, inject } from '@angular/core';
import { HeaderService } from '../../services/header.service';
import { SeedH1 } from '@seed/typography/seed-h1';
import { SeedH2 } from '@seed/typography/seed-h2';

@Component({
  selector: 'app-about.page',
  imports: [SeedH1, SeedH2],
  templateUrl: './about.page.html',
  styleUrl: './about.page.css',
})
export class AboutPage {
  today = new Date();
  birthday = new Date(1997, 1, 10);
  ageInYears = computed(() => {
    const ageDiff = this.today.getTime() - this.birthday.getTime();
    const ageDate = new Date(ageDiff);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  });

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
