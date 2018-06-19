import { NewsDetailComponent } from './components/news-detail/news-detail.component';
import { CreateEditNewsComponent } from './components/create-edit-news/create-edit-news.component';
import { NgModule } from '@angular/core';
import { NewsComponent } from './components/news/news.component';
import { RouterModule } from '@angular/router';

const newsRoutes = [
  {
    // TODO: update after finish create news
    path: '',
    component: NewsComponent,
    data: {
      breadcrumb: 'News'
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
    path: 'edit/:id',
    component: CreateEditNewsComponent,
    data: {
      breadcrumb: 'Edit news'
    }
 },
];

@NgModule({
  imports: [RouterModule.forChild(newsRoutes)],
  exports: [RouterModule]
})
export class NewsRoutingModule { }
