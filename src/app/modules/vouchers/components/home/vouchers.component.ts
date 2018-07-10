import { Voucher } from './../../../../shared/models/voucher.model';
import { VoucherService } from './../../services/vouchers.service';
import { TranslateService } from './../../../../shared/services/translate.service';
import { Component, OnInit } from '@angular/core';
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
  private transferData = new TransferGroupData();

  constructor(
    private exDialog: ExDialog,
    private voucherService: VoucherService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private translateService: TranslateService
  ) {
    super();
  }

  public count = (searchKey: string): Observable<number> => {
    return this.voucherService.count(searchKey);
  }

  ngOnInit() {
  }

  private loadData(eventArg: IFilterChangedEvent) {
  }

  onPageChanged(eventArg: IFilterChangedEvent) {
    this.transferData.filterEvent = eventArg;
    this.loadData(eventArg);
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

}
