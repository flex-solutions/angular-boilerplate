import { CreatePromotionComponent } from './components/create-promotion/create-promotion.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PromotionsRoutingModule { }
