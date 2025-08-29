import { Routes } from '@angular/router';
import { HomePage } from './pages/home/home.page';
import { AboutPage } from './pages/about/about.page';
import { environment } from '../environments/environment';

export const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'about',
    component: AboutPage,
  },
  {
    path: 'blog',
    loadChildren: () =>
      import('./pages/blog/blog-module').then((m) => m.BlogModule),
  },
  {
    path: 'test',
    loadChildren: () =>
      import('./pages/test/test-module').then((m) => m.TestModule),
    canActivate: [() => !environment.production],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
