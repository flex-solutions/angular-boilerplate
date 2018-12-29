import { ViewVoucherComponent } from './components/view-voucher/component';
import { CreateEditVoucherComponent } from './components/create-edit/create-edit.component';
import { VouchersComponent } from './components/home/vouchers.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditVoucherRunningComponent } from './components/create-edit/edit-voucher-running.component';
import { VouchersRunningComponent } from './components/vouchers-running';
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
  },
  {
    path: 'voucher-running/edit/:id/:code',
    component: EditVoucherRunningComponent,
    data: {
      breadcrumb: 'Update voucher information'
    }
  },
  {
    path: 'promotions/view/:id/:isRunning',
    component: ViewVoucherComponent,
    data: {
      breadcrumb: 'View voucher'
    }
  },
  {
    path: 'detail/:id/:isRunning',
    component: ViewVoucherComponent,
    data: {
      breadcrumb: 'View voucher'
    }
  },
  {
    // TODO: update after finish create news
    path: 'update/:id',
    component: CreateEditVoucherComponent,
    data: {
      breadcrumb: 'Edit voucher'
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(VoucherRoutes)],
  exports: [RouterModule]
})
export class VouchersRoutingModule { }
