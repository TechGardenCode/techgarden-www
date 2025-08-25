import { Component, inject, ViewEncapsulation } from '@angular/core';
import { SeedButton } from '@seed/components/button/seed-button';
import { SeedIcon } from '@seed/components/icon/seed-icon';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideDot,
  lucideGithub,
  lucideHouse,
  lucideInfo,
  lucideMoon,
  lucideNotebookPen,
  lucideSun,
  lucideTwitter,
} from '@ng-icons/lucide';
import { RouterModule } from '@angular/router';
import { ThemeService } from '../../../services/theme.service';
import { MobileService } from '../../../services/mobile.service';

@Component({
  selector: 'app-nav',
  imports: [RouterModule, SeedButton, SeedIcon, NgIcon],
  providers: [
    provideIcons({
      lucideMoon,
      lucideSun,
      lucideHouse,
      lucideInfo,
      lucideDot,
      lucideGithub,
      lucideTwitter,
      lucideNotebookPen,
    }),
  ],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
  encapsulation: ViewEncapsulation.None,
  host: {
    class:
      'p-6 w-full h-full bg-card text-card-foreground border-r border-border flex flex-col gap-4 items-start',
  },
})
export class Nav {
  protected readonly themeService = inject(ThemeService);
  protected readonly mobileService = inject(MobileService);
}
