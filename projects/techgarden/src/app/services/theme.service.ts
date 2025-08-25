import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  initLightDarkMode() {
    let isDark =
      localStorage.getItem('theme') === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches);
    this.setLightDarkMode(isDark);
  }

  toggleLightDarkMode() {
    const isDark = document.documentElement.classList.contains('dark');
    this.setLightDarkMode(!isDark);
  }

  setLightDarkMode(mode: 'light' | 'dark' | boolean) {
    if (typeof mode === 'boolean') {
      mode = mode ? 'dark' : 'light';
    }
    if (mode === 'dark') {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }

  getMode(): 'light' | 'dark' {
    return document.documentElement.classList.contains('dark')
      ? 'dark'
      : 'light';
  }
}
