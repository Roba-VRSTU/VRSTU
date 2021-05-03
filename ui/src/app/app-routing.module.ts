import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { Constant } from 'src/constant'
import { SinglePageComponent } from './layouts/single-page/single-page.component'
import { BlogDetailComponent } from './pages/blog-detail/blog-detail.component'
import { BlogListComponent } from './pages/blog-list/blog-list.component'
import { HomeComponent } from './pages/home/home.component'

const routes: Routes = [
  {
    path: Constant.ROUTER_ROOT_URL,
    component: SinglePageComponent,
    // outlet: 'layout-router',
    children: [
      { path: Constant.ROUTER_ROOT_URL, component: HomeComponent },
      { path: Constant.ROUTER_BLOG_LIST_URL, component: BlogListComponent },
      { path: Constant.ROUTER_BLOG_POST_URL + '/:id', component: BlogDetailComponent },
    ],
  },
  // { path: Constant.ROUTER_BLOG_URL },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
