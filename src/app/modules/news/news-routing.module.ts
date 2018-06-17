import { NewsDetailComponent } from './components/news-detail/news-detail.component';
import { CreateEditNewsComponent } from './components/create-edit-news/create-edit-news.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

const newsRoutes = [
  {
    path: ':id',
    component: NewsDetailComponent,
    data: {
      breadcrumb: 'News Details'
    }
  },
  {
    // TODO: update after finish create news
    path: '',
    component: CreateEditNewsComponent,
    data: {
      breadcrumb: 'News'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(newsRoutes)],
  exports: [RouterModule]
})
export class NewsRoutingModule {}
