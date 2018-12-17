import { ViewVoucherComponent } from './view-voucher/component';
import { CreateEditVoucherComponent } from './create-edit/create-edit.component';
import { VouchersComponent } from './home/vouchers.component';
import { VoucherFilterComponent } from './voucher-filter/voucher-filter.component';
import { RunBatchExportVoucherComponent } from './run-voucher/run-batch-export-voucher.component';
import { RunRepeatOneCodeVoucherComponent } from './run-voucher/run-repeat-one-code-voucher.component';
import { VouchersRunningComponent } from './vouchers-running/index.component';
import { CommonCreateEditVoucherComponent } from './create-edit/common.component.';

const voucherComponents = [
    VouchersComponent,
    VoucherFilterComponent,
    CreateEditVoucherComponent,
    RunBatchExportVoucherComponent,
    RunRepeatOneCodeVoucherComponent,
    VouchersRunningComponent,
    ViewVoucherComponent,
    CommonCreateEditVoucherComponent
];

const voucherEntryComponents = [
  RunBatchExportVoucherComponent,
  RunRepeatOneCodeVoucherComponent
];

export {voucherComponents, voucherEntryComponents};
