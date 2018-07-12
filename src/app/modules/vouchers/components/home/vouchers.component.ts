import { filter } from 'ramda';
import { DatagridComponent } from './../../../../shared/ui-common/datagrid/components/datagrid.component';
import { VoucherCriteriaBuilder } from './../../voucher-filter/voucher-filter.builder';
import { Voucher, VoucherFilter } from './../../../../shared/models/voucher.model';
import { VoucherService } from './../../services/vouchers.service';
import { TranslateService } from './../../../../shared/services/translate.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IFilterChangedEvent } from '../../../../shared/ui-common/datagrid/components/datagrid.component';
import ArrayExtension from '../../../../utilities/array.extension';
import { ExDialog } from '../../../../shared/ui-common/modal/services/ex-dialog.service';
import { TransferGroupData } from '../../../../shared/models/transfer-group-data.model';
import { Permission } from '../../../../shared/guards/decorator';
import { AbstractBaseComponent } from '../../../../shared/abstract/abstract-base-component';
import { VouchersRoutingModule } from '../../voucher-routing.module';

@Component({
  moduleId: module.id,
  selector: 'app-vouchers',
  templateUrl: './vouchers.component.html'
})

@Permission({
  module: 'Voucher Management'
})
export class VouchersComponent extends AbstractBaseComponent implements OnInit {
  public items: Voucher[] = [];
  private _hasUseFilter: boolean;
  voucherFilter: VoucherFilter = new VoucherFilter();
  filter: IFilterChangedEvent;
  @ViewChild(DatagridComponent) dataGrid: DatagridComponent;

  constructor(
    private exDialog: ExDialog,
    private voucherService: VoucherService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private translateService: TranslateService
  ) {
    super();
    this._hasUseFilter = false;
  }

  public count = (searchKey: string): Observable<number> => {
    if (!this._hasUseFilter) {
      return this.voucherService.count();
    }
    return this.voucherService.countWithFilterQuery(this.getQuery());
  }

  ngOnInit() {
  }

  onRunFilterClicked() {
    this._hasUseFilter = true;
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

  async deletevoucher(voucher: Voucher) {
    // Call service to delete voucher
    await this.voucherService.remove(voucher._id);
    // Remove voucher in voucher list
    ArrayExtension.removeItemFromArray(this.items, voucher);
  }

  navigateToCreatePage() {
    // this.router.navigate([VouchersRoutingModule.CREATE_PAGE]);
  }

  navigateToEditPage(voucher: Voucher) {
    // this.router.navigate([VouchersRoutingModule.EDIT_PAGE, voucher._id]);
  }

  navigateTovoucherDetailPage(voucher: Voucher) {
    // this.router.navigate([VouchersRoutingModule.DETAIL_PAGE, voucher._id]);
  }

  private getVouchers() {
    if (this._hasUseFilter) {
      this.voucherService
        .getVouchersWithFilterQuery(
          this.filter.pagination.page,
          this.filter.pagination.itemsPerPage,
          this.getQuery()
        )
        .subscribe(res => {
          this.items = res;
        });
    } else {
      this.voucherService
        .getvouchers(
          this.filter.pagination.page,
          this.filter.pagination.itemsPerPage
        )
        .subscribe(res => {
          this.items = res;
        });
    }
  }

  loadData() {
    this.count('').subscribe(total => {
      this.dataGrid.totalItems = +total;
      this.dataGrid.countPageEntry();
      this.getVouchers();
    });
  }

  resetFilter = () => {
    this._hasUseFilter = false;
    this.loadData();
  }
  
}
