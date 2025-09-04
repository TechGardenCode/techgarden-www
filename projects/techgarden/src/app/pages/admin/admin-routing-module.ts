import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPage } from './admin.page';
import { BlogPostEditPage } from './blog/post/edit/blog-post-edit.page';
import { BlogPostCreatePage } from './blog/post/create/blog-post-create.page';
import { AdminBlogPage } from './blog/blog.page';

const routes: Routes = [
  {
    path: '',
    component: AdminPage,
  },
  {
    path: 'blog',
    children: [
      {
        path: '',
        component: AdminBlogPage
      },
      {
        path: 'edit/:postId',
        component: BlogPostEditPage,
      },
      {
        path: 'create',
        component: BlogPostCreatePage,
      },
    ],
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
export class AdminRoutingModule {}
