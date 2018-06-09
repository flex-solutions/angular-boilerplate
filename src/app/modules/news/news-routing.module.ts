import { CreateEditNewsComponent } from './components/create-edit-news/create-edit-news.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const newRoutes: Routes = [
  
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
  imports: [RouterModule.forChild(newRoutes)],
  exports: [RouterModule]
})
export class NewsRoutingModule { }
