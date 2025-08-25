import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MobileService {
  isNavOpen = signal(false);

  toggleNav() {
    this.isNavOpen.update((value) => !value);
  }

  openNav() {
    if (!this.isNavOpen()) {
      this.isNavOpen.set(true);
    }
  }

  closeNav() {
    if (this.isNavOpen()) {
      this.isNavOpen.set(false);
    }
  }
}
