import { Component, HostListener, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MobileService } from './services/mobile.service';
import { Nav } from './components/shared/nav/nav';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideChevronUp } from '@ng-icons/lucide';
import { Header } from './components/shared/header/header';
import { HeaderService } from './services/header.service';
import { ThemeService } from './services/theme.service';
import { SeedButton } from '@seed/components/button/seed-button';
import { Footer } from './components/shared/footer/footer';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Nav, NgIcon, Header, SeedButton, Footer],
  providers: [provideIcons({ lucideChevronUp })],
  templateUrl: './app.html',
  styleUrl: './app.css',
  host: {
    class: 'flex flex-col min-h-screen',
  },
})
export class App {
  protected readonly title = signal('techgarden');
  protected readonly mobileService = inject(MobileService);
  protected readonly headerService = inject(HeaderService);
  protected readonly themeService = inject(ThemeService);

  protected readonly pageScrolledY = signal(false);

  constructor() {
    this.themeService.initLightDarkMode();
    this.headerService.breadcrumbs.set([
      {
        label: 'Home',
        url: '/',
      },
      {
        label: 'About',
        url: '/about',
      },
    ]);
  }
  _scrollTimeout!: number;

  @HostListener('window:keydown.escape')
  onEscapeKeyDown(): void {
    this.mobileService.closeNav();
  }

  @HostListener('window:scroll')
  onScroll(): void {
    const shouldShow = window.scrollY > 0;
    if (this.pageScrolledY() !== shouldShow) {
      this.pageScrolledY.set(shouldShow);
    }
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
