import { Component, inject, OnInit, ViewEncapsulation } from '@angular/core';
import { SeedButton, SeedButtonGroup } from '@seed/button';
import { SeedIcon } from '@seed/icon';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideChevronDown,
  lucideChevronUp,
  lucideDot,
  lucideGithub,
  lucideHouse,
  lucideInfo,
  lucideLogIn,
  lucideLogOut,
  lucideMoon,
  lucideNotebookPen,
  lucideShieldUser,
  lucideSun,
  lucideTwitter,
} from '@ng-icons/lucide';
import { RouterModule } from '@angular/router';
import { ThemeService } from '../../../services/theme.service';
import { MobileService } from '../../../services/mobile.service';
import { SeedH1 } from '@seed/typography';
import { AuthService } from '../../../services/auth/auth.service';
import {
  SeedMenuTrigger,
  SeedMenu,
  SeedMenuLabel,
  SeedMenuGroup,
  SeedMenuSeparator,
  SeedSubMenu,
  SeedMenuItem,
} from '@seed/menu';

@Component({
  selector: 'app-nav',
  imports: [
    RouterModule,
    SeedButton,
    SeedIcon,
    NgIcon,
    SeedH1,
    SeedMenuTrigger,
    SeedMenuItem,
    SeedMenu,
    SeedMenuLabel,
    SeedMenuGroup,
    SeedMenuSeparator,
    SeedSubMenu,
    SeedButtonGroup
  ],
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
      lucideLogIn,
      lucideLogOut,
      lucideShieldUser,
      lucideChevronDown,
      lucideChevronUp
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
export class Nav implements OnInit {
  protected readonly themeService = inject(ThemeService);
  protected readonly mobileService = inject(MobileService);
  protected readonly authService = inject(AuthService);

  ngOnInit() {
    this.authService.checkAuthentication().subscribe();
  }
}
