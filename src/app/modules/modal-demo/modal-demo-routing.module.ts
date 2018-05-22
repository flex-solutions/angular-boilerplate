import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModalDemoComponent } from './demo/modal-demo.component';

const routes: Routes = [
  {
    path: 'modal-demo',
    component: ModalDemoComponent,
    data: {
      breadcrumb: 'Modal Demo'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModalDemoRoutingModule {}
