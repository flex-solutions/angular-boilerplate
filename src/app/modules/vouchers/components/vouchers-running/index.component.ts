import { Component, OnInit } from '@angular/core';
import { AbstractBaseComponent } from '../../../../shared/abstract/abstract-base-component';
import { IFilterChangedEvent } from '../../../../shared/ui-common/datagrid/components/datagrid.component';
import { VoucherService } from '../../services/vouchers.service';
import { VoucherRunning } from '../../../../shared/models/voucher-campaign.model';
import { Observable } from 'rxjs';

@Component({
  moduleId: module.id,
  selector: 'app-vouchers-running',
  templateUrl: './index.component.html',
})

export class VouchersRunningComponent extends AbstractBaseComponent implements OnInit {

  items: VoucherRunning[] = [];

  constructor(private voucherService: VoucherService) {
    super();
  }

  ngOnInit(): void {
  }
}
