import { VoucherStatusCheckedItem } from './../../../shared/models/voucher.model';
import { SelectableModel } from './../../../shared/models/selectable.model';
import { TranslateService } from './../../../shared/services/translate.service';
import { Select2Component } from './../../../shared/ui-common/select2/select2.component';
import {
  Component,
  AfterViewInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectorRef,
  QueryList,
  ViewChildren
} from '@angular/core';
import { VoucherFilter, VoucherStatus } from '../../../shared/models/voucher.model';
import { VoucherMessageConst } from '../vouchers.constants';

@Component({
  selector: 'app-voucher-filter',
  templateUrl: './voucher-filter.component.html',
  styleUrls: ['./voucher-filter.component.css']
})
export class VoucherFilterComponent implements AfterViewInit {
  private _voucherFilter: VoucherFilter;
  selectedStatus: VoucherStatusCheckedItem[] = [];
  private _resetFunction: () => void;

  // Get list select2 component
  @ViewChildren(Select2Component)
  select2Components: QueryList<Select2Component>;

  // Call when custom filter change
  @Output() voucherFilterChange = new EventEmitter();

  // Call when button run filter have clicked
  @Output() runFilterClicked = new EventEmitter();

  // Get and set member filter property
  @Input()
  set voucherFilter(value) {
    this._voucherFilter = value;
    this.voucherFilterChange.emit(this._voucherFilter);
  }

  get voucherFilter() {
    return this._voucherFilter;
  }

  // Get and set reset callback function
  @Input()
  get resetFunction() {
    return this._resetFunction;
  }

  set resetFunction(v: any) {
    this._resetFunction = v;
  }

  name: string;
  create_on: Date;
  statuses: SelectableModel<VoucherStatusCheckedItem>[] = [];

  constructor(
    private ref: ChangeDetectorRef, private translateService: TranslateService
  ) {
    this.voucherFilter = new VoucherFilter();
  }

  ngAfterViewInit(): void {
    this.buildStatusItemSource();
  }

  runFilter() {
    this._voucherFilter.status = [];
    if (this.selectedStatus && this.selectedStatus.length > 0) {
      this.selectedStatus.forEach((value) => {
        this._voucherFilter.status.push(value.status);
      });
    }
    this.runFilterClicked.emit();
  }

  resetFilter() {
    this.voucherFilter = new VoucherFilter();
    this.select2Components.forEach(i => i.reset());
    this.resetFunction();
  }


  buildStatusItemSource() {
    this.statuses.push(
      {
        isSelected: false,
        model: {
          status: VoucherStatus.running,
          displayName: this.translateService.translate(VoucherMessageConst.RunningStatus)
        }
      },
      {
        isSelected: false,
        model: {
          status: VoucherStatus.expired,
          displayName: this.translateService.translate(VoucherMessageConst.ExpiredStatus)
        }
      });

    this.selectedStatus = [];
  }
}
