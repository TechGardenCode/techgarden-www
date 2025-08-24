import {
  Component,
  HostListener,
  inject,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Nav } from './components/nav/nav';
import { ThemeService } from './services/theme-service';
import { MobileService } from './services/mobile.service';
import { SeedButton } from '@seed/components/button/seed-button';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideChevronUp } from '@ng-icons/lucide';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Nav, SeedButton, NgIcon],
  providers: [provideIcons({ lucideChevronUp })],
  templateUrl: './app.html',
  styleUrl: './app.css',
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'block',
  },
})
export class App {
  protected readonly themeService = inject(ThemeService);
  protected readonly mobileService = inject(MobileService);

  protected readonly title = signal('blog');
  protected readonly showScrollToTop = signal(false);

  constructor() {
    this.themeService.initLightDarkMode();
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    this.showScrollToTop.set(window.scrollY > 0);
  }

  protected scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
