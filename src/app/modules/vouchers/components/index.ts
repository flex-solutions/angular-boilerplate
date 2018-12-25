import { EditVoucherRunningComponent } from './create-edit/edit-voucher-running.component';
import { ViewVoucherComponent } from './view-voucher/component';
import { CreateEditVoucherComponent } from './create-edit/create-edit.component';
import { VouchersComponent } from './home/vouchers.component';
import { VoucherFilterComponent } from './voucher-filter/voucher-filter.component';
import { RunBatchExportVoucherComponent } from './run-voucher/run-batch-export-voucher.component';
import { RunRepeatOneCodeVoucherComponent } from './run-voucher/run-repeat-one-code-voucher.component';
import { CommonCreateEditVoucherComponent } from './create-edit/common.component.';
import {
  VouchersRunningComponent,
  PublishedVoucherCodeOfMemberCareComponent,
  HistoryOfMemberCareComponent
} from './vouchers-running/components';

const voucherComponents = [
    VouchersComponent,
    VoucherFilterComponent,
    CreateEditVoucherComponent,
    RunBatchExportVoucherComponent,
    RunRepeatOneCodeVoucherComponent,
    VouchersRunningComponent,
    ViewVoucherComponent,
    CommonCreateEditVoucherComponent,
    EditVoucherRunningComponent,
    PublishedVoucherCodeOfMemberCareComponent,
    HistoryOfMemberCareComponent
];

const voucherEntryComponents = [
  RunBatchExportVoucherComponent,
  RunRepeatOneCodeVoucherComponent,
  PublishedVoucherCodeOfMemberCareComponent,
  HistoryOfMemberCareComponent,
];

export {voucherComponents, voucherEntryComponents};
