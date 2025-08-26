import {
  Component,
  Host,
  HostBinding,
  HostListener,
  inject,
  OnInit,
  signal,
} from '@angular/core';
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
    class: 'flex flex-col min-h-svh data-[mobile-open=true]:overflow-hidden',
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

  @HostBinding('attr.data-mobile-open')
  get isMobileNavOpen(): boolean {
    return this.mobileService.isNavOpen();
  }

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

  private swipeCoord = signal<[number, number] | null>(null);
  private swipeTime = signal<number | null>(null);

  // @HostListener('window:touchstart', ['$event'])
  // onTouchStart(event: TouchEvent): void {
  //   const coord: [number, number] = [
  //     event.changedTouches[0].clientX,
  //     event.changedTouches[0].clientY,
  //   ];
  //   const time = new Date().getTime();
  //   this.swipeCoord.set(coord);
  //   this.swipeTime.set(time);
  // }

  // @HostListener('window:touchend', ['$event'])
  // onTouchEnd(event: TouchEvent): void {
  //   const coord: [number, number] = [
  //     event.changedTouches[0].clientX,
  //     event.changedTouches[0].clientY,
  //   ];
  //   const time = new Date().getTime();
  //   const swipeCoord = this.swipeCoord();
  //   if (!swipeCoord) return;
  //   const swipeTime = this.swipeTime();
  //   if (!swipeTime) return;
  //   const duration = time - swipeTime;
  //   const direction = [coord[0] - swipeCoord[0], coord[1] - swipeCoord[1]];

  //   if (
  //     duration < 1000 &&
  //     Math.abs(direction[0]) > 30 &&
  //     Math.abs(direction[0]) > Math.abs(direction[1] * 3)
  //   ) {
  //     if (direction[0] < 0) {
  //       if (swipeCoord[0] > window.innerWidth / 2) {
  //         this.mobileService.closeNav();
  //       }
  //     } else {
  //       if (swipeCoord[0] < window.innerWidth / 2) {
  //         this.mobileService.openNav();
  //       }
  //     }
  //   }
  // }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
