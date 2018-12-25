import { DialogComponent } from '../../../../../shared/ui-common/modal/components/dialog.component';
import { OnInit, Component } from '@angular/core';
import { isNullOrEmptyOrUndefined } from '../../../../../utilities/util';

@Component({
  moduleId: module.id,
  selector: 'app-vouchers-running-manual-use-code',
  templateUrl: './manual-use-code.component.html',
})

export class ManualUseVoucherCodeComponent extends DialogComponent implements OnInit {
  voucherName: string;
  publishCode: string;
  billId: string;

  ngOnInit(): void {
    this.voucherName = this.callerData.voucherName;
    this.publishCode = this.callerData.publishCode;
  }

  submit() {
    if (!isNullOrEmptyOrUndefined(this.billId)) {
      this.result = this.billId;
    }

    this.dialogResult();
  }

  cancel() {
    this.dialogResult();
  }
}
