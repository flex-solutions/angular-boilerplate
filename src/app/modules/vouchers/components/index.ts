import { CreateEditVoucherComponent } from './create-edit/create-edit.component';
import { VouchersComponent } from './home/vouchers.component';
import { VoucherFilterComponent } from './voucher-filter/voucher-filter.component';
import { RunBatchExportVoucherComponent } from './run-voucher/run-batch-export-voucher.component';
import { RunRepeatOneCodeVoucherComponent } from './run-voucher/run-repeat-one-code-voucher.component';

const voucherComponents = [
    VouchersComponent,
    VoucherFilterComponent,
    CreateEditVoucherComponent,
    RunBatchExportVoucherComponent,
    RunRepeatOneCodeVoucherComponent
];

const voucherEntryComponents = [
  RunBatchExportVoucherComponent,
  RunRepeatOneCodeVoucherComponent
];

export {voucherComponents, voucherEntryComponents};
