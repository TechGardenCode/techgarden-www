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
  lucideTestTube,
  lucideTwitter,
} from '@ng-icons/lucide';
import { RouterModule } from '@angular/router';
import { ThemeService } from '../../../services/theme.service';
import { MobileService } from '../../../services/mobile.service';
import { SeedH1 } from '@seed/typography/seed-h1';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-nav',
  imports: [RouterModule, SeedButton, SeedIcon, NgIcon, SeedH1],
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
      lucideTestTube,
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
  environment = environment;
  protected readonly themeService = inject(ThemeService);
  protected readonly mobileService = inject(MobileService);
}
