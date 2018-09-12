import { CreateEditVoucherComponent } from './components/create-edit/create-edit.component';
import { VouchersComponent } from './components/home/vouchers.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VouchersRunningComponent } from './components/vouchers-running/index.component';
const VoucherRoutes: Routes = [
  {
    path: '',
    component: VouchersComponent,
    data: {
      breadcrumb: 'Vouchers'
    }
  },
  {
    path: 'create',
    component: CreateEditVoucherComponent,
    data: {
      breadcrumb: 'Create new voucher'
    }
  },
  {
    path: 'vouchers-running',
    component: VouchersRunningComponent,
    data: {
      breadcrumb: 'Vouchers are running'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(VoucherRoutes)],
  exports: [RouterModule]
})
export class VouchersRoutingModule { }
