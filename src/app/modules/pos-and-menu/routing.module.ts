import { POSEditComponent } from './components/edit/component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { POSComponent } from './components/list/list.component';

const routes: Routes = [
    {
      path: '',
      component: POSComponent,
      data: {
        breadcrumb: 'SNOB Point Of Sales'
      }
    },
    {
      path: 'update/:id',
      component: POSEditComponent,
      data: {
        breadcrumb: 'Update POS'
      }
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PosAndMenuRoutingModule {}
