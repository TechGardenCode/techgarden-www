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
    this.isNavOpen.set(true);
  }

  closeNav() {
    this.isNavOpen.set(false);
  }
}
