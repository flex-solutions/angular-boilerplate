import { NewsDetailComponent } from './components/news-detail/news-detail.component';
import { NewsHomeComponent } from './components/news-home/news-home.component';
import { NewsCreateEditComponent } from './components/news-create-edit/news-create-edit.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

const newsRoutes = [
  {
    path: '',
    component: NewsHomeComponent,
    data: {
      breadcrumb: 'User Groups'
    },
    children: [
    ]
  },
  {
    path: ':id',
    component: NewsDetailComponent,
    data: {
      breadcrumb: 'News Details'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(newsRoutes)],
  exports: [RouterModule]
})
export class NewsRoutingModule {}
