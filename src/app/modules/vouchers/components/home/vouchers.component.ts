import { TranslateService } from './../../../../shared/services/translate.service';
import { DatagridComponent } from './../../../../shared/ui-common/datagrid/components/datagrid.component';
import { VoucherCriteriaBuilder } from './../voucher-filter/voucher-filter.builder';
import {
  Voucher,
  VoucherFilter
} from './../../../../shared/models/voucher.model';
import { VoucherService } from './../../services/vouchers.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { IFilterChangedEvent } from '../../../../shared/ui-common/datagrid/components/datagrid.component';
import { Permission } from '../../../../shared/guards/decorator';
import { AbstractBaseComponent } from '../../../../shared/abstract/abstract-base-component';
import { VoucherRunner } from '../run-voucher/voucher-runner';
import { ExDialog } from '../../../../shared/ui-common/modal/services/ex-dialog.service';
import { NotificationService } from '../../../../shared/services/notification.service';
import { Router } from '@angular/router';
import { VoucherRouteNames } from '../../vouchers.constants';
import { isNullOrEmptyOrUndefined } from '../../../../utilities/util';

@Component({
  moduleId: module.id,
  selector: 'app-vouchers',
  templateUrl: './vouchers.component.html',
  styleUrls: ['./vouchers.component.css']
})
@Permission({
  module: 'Voucher Management'
})
export class VouchersComponent extends AbstractBaseComponent implements OnInit {
  public items: Voucher[] = [];
  voucherFilter: VoucherFilter = new VoucherFilter();
  filter: IFilterChangedEvent;
  @ViewChild(DatagridComponent)
  dataGrid: DatagridComponent;

  constructor(
    private readonly voucherService: VoucherService,
    private readonly voucherRunner: VoucherRunner,
    private readonly exDialog: ExDialog,
    private readonly notification: NotificationService,
    private readonly translateService: TranslateService,
    private readonly router: Router
  ) {
    super();
  }

  public count = (searchKey: string): Observable<number> => {
    return this.voucherService.countWithFilterQuery(this.getQuery());
  }

  ngOnInit() {}

  onRunFilterClicked() {
    this.loadData();
  }

  private getQuery() {
    const query = VoucherCriteriaBuilder.build(this.voucherFilter);
    return query;
  }

  onPageChanged(eventArg: IFilterChangedEvent) {
    this.filter = eventArg;
    this.getVouchers();
  }

  async deleteVoucher(voucher: Voucher) {
    // Get all membership type which are reference to this voucher
    const membershipTypes = await this.voucherService
      .getMembershipTypes(voucher._id)
      .toPromise();
    let deleteConfirmMsg;
    if (isNullOrEmptyOrUndefined(membershipTypes)) {
      deleteConfirmMsg = this.translateService.translate(
        'vouchers-delete-confirm',
        voucher.name
      );
    } else {
      const membershipTypeNames = membershipTypes.map(m => m.name);
      deleteConfirmMsg = this.translateService.translate(
        'vouchers-delete-warning-confirm',
        voucher.name,
        membershipTypeNames.join(', ')
      );
    }
    const deleteSuccessMsg = this.translateService.translate(
      'vouchers-delete-success',
      voucher.name
    );
    this.exDialog.openConfirm(deleteConfirmMsg).subscribe(result => {
      if (result === true) {
        // Call service to delete voucher
        this.voucherService.remove(voucher._id).subscribe(() => {
          this.notification.showSuccess(deleteSuccessMsg);
          this.getVouchers();
        });
      }
    });
  }

  navigateToCreatePage() {
    // this.router.navigate([VouchersRoutingModule.CREATE_PAGE]);
  }

  editVoucher(voucher: Voucher) {
    this.router.navigate([`${VoucherRouteNames.EDIT}/${voucher._id}`]);
  }

  navigateTovoucherDetailPage(voucher: Voucher) {
    // this.router.navigate([VouchersRoutingModule.DETAIL_PAGE, voucher._id]);
  }

  private getVouchers() {
    this.voucherService
      .getVouchersWithFilterQuery(
        this.filter.pagination.page,
        this.filter.pagination.itemsPerPage,
        this.getQuery()
      )
      .subscribe(res => {
        this.items = res;
      });
  }

  loadData() {
    this.count('').subscribe(total => {
      this.dataGrid.totalItems = +total;
      this.dataGrid.countPageEntry();
      this.getVouchers();
    });
  }

  resetFilter = () => {
    this.loadData();
  };

  runACampaign(voucher: Voucher) {
    this.voucherRunner.run(voucher);
  }
}
