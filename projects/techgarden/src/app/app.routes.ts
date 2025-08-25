import { Routes } from '@angular/router';
import { HomePage } from './pages/home/home.page';

export const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'blog',
    loadChildren: () =>
      import('./pages/blog/blog-module').then((m) => m.BlogModule),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
