import { voucherComponents } from './components/index';
import { VoucherService } from './services/vouchers.service';
import { VouchersRoutingModule } from './voucher-routing.module';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UICommonModule } from '../../shared/ui-common/ui-common.module';
import { VouchersComponent } from './components/home/vouchers.component';
import { VoucherStatusDirective } from './directives/voucherStatus.directive';

@NgModule({
  imports: [
    CommonModule, VouchersRoutingModule,
    FormsModule, ReactiveFormsModule,
    UICommonModule
  ],
  declarations: [
      VoucherStatusDirective, ...voucherComponents
  ],
  providers: [VoucherService],

})

export class VouchersModule { }
