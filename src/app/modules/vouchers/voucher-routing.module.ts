import { VouchersComponent } from './components/home/vouchers.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
const VoucherRoutes: Routes = [
  {
    path: '',
    component: VouchersComponent,
    data: {
      breadcrumb: 'Vouchers'
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(VoucherRoutes)],
  exports: [RouterModule]
})
export class VouchersRoutingModule { }
