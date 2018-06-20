import { CreatePromotionComponent } from './components/create-promotion/create-promotion.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PromotionsComponent } from './components/promotions/promotions.component';

const routes: Routes = [
  {
    path: '',
    component: PromotionsComponent,
    data: {
      breadcrumb: 'Promotions'
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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PromotionsRoutingModule { }
