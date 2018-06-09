import { CreateEditViewComponent } from './components/create-edit-views/create-edit-view.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const viewRoutes: Routes = [
  
  {
    path: 'create',
    component: CreateEditViewComponent,
    data: {
      breadcrumb: 'Create Views'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(viewRoutes)],
  exports: [RouterModule]
})
export class ViewsRoutingModule { }
