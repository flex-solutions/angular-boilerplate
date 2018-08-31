
import { DatagridComponent } from './../../../../shared/ui-common/datagrid/components/datagrid.component';
import { VoucherCriteriaBuilder } from './../voucher-filter/voucher-filter.builder';
import { Voucher, VoucherFilter } from './../../../../shared/models/voucher.model';
import { VoucherService } from './../../services/vouchers.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { IFilterChangedEvent } from '../../../../shared/ui-common/datagrid/components/datagrid.component';
import ArrayExtension from '../../../../utilities/array.extension';
import { Permission } from '../../../../shared/guards/decorator';
import { AbstractBaseComponent } from '../../../../shared/abstract/abstract-base-component';
import { VoucherRunner } from '../run-voucher/voucher-runner';

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
  @ViewChild(DatagridComponent) dataGrid: DatagridComponent;

  constructor(private voucherService: VoucherService,
    private voucherRunner: VoucherRunner) {
    super();
  }

  public count = (searchKey: string): Observable<number> => {
    return this.voucherService.countWithFilterQuery(this.getQuery());
  }

  ngOnInit() {
  }

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
  }

  runACampaign(voucher: Voucher) {
    this.voucherRunner.run(voucher);
  }

}
