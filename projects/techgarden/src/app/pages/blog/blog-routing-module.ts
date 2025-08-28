import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogPage } from './blog.page';
import { PostsPage } from './posts/posts.page';

const routes: Routes = [
  {
    path: '',
    component: BlogPage,
  },
  {
    path: ':postId',
    component: PostsPage,
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BlogRoutingModule {}
