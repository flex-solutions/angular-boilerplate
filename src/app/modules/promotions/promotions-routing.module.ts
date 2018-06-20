import { CreatePromotionComponent } from './components/create-promotion/create-promotion.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailPromotionComponent } from './components/detail-promotion/detail-promotion/detail-promotion.component';

const routes: Routes = [
  {
    path: '',
    component: CreatePromotionComponent,
    data: {
      breadcrumb: 'Create Promotion'
    }
  },
  {
    path: 'create',
    component: CreatePromotionComponent,
    data: {
      breadcrumb: 'Create Promotion'
    }
  },
  {
    path: 'edit/:id',
    component: CreatePromotionComponent,
    data: {
      breadcrumb: 'Edit Promotion'
    }
  },
  {
    path: 'detail/:id',
    component: DetailPromotionComponent,
    data: {
      breadcrumb: 'View Promotion Detail'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PromotionsRoutingModule { }
