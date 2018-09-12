import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PosComponent } from './components/list/list.component';

const routes: Routes = [
    {
      path: '',
      component: PosComponent,
      data: {
        breadcrumb: 'SNOB Point Of Sales'
      }
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PosAndMenuRoutingModule {}
