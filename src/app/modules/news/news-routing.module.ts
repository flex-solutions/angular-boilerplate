import { NewsDetailComponent } from './components/news-detail/news-detail.component';
import { CreateEditNewsComponent } from './components/create-edit-news/create-edit-news.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewsComponent } from './components/news/news.component';

const newRoutes: Routes = [
  {
    // TODO: update after finish create news
    path: '',
    component: NewsComponent,
    data: {
      breadcrumb: 'News'
    }
  },
    {
    path: 'detail/:id',
    component: NewsDetailComponent,
    data: {
      breadcrumb: 'News Details'
    }
  },
  {
     // TODO: update after finish create news
     path: 'create',
     component: CreateEditNewsComponent,
     data: {
       breadcrumb: 'Create news'
     }
  },
  {
    path: ':id',
    component: NewsDetailComponent,
    data: {
      breadcrumb: 'News Details'
    }
  },
  {
    // TODO: update after finish create news
    path: 'update/:id',
    component: CreateEditNewsComponent,
    data: {
      breadcrumb: 'Edit news'
    }
 },
];

@NgModule({
  imports: [RouterModule.forChild(newRoutes)],
  exports: [RouterModule]
})
export class NewsRoutingModule { }