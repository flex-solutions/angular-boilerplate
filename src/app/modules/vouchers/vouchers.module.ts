import { POSService } from './services/pos.service';
import { voucherComponents, voucherEntryComponents } from './components/index';
import { VoucherService } from './services/vouchers.service';
import { VouchersRoutingModule } from './voucher-routing.module';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UICommonModule } from '../../shared/ui-common/ui-common.module';
import { VoucherStatusDirective } from './directives/voucherStatus.directive';
import { SharedModule } from '../../shared/shared.module';
import { VoucherFormFactory } from './components/create-edit/voucher-form.factory';
import { VoucherRunner } from './components/run-voucher/voucher-runner';

@NgModule({
  imports: [
    CommonModule, VouchersRoutingModule,
    FormsModule, ReactiveFormsModule,
    UICommonModule, SharedModule
  ],
  declarations: [
      VoucherStatusDirective, ...voucherComponents
  ],
  providers: [VoucherService, POSService, VoucherFormFactory, VoucherRunner],
  entryComponents: [...voucherEntryComponents]
})

export class VouchersModule { }
