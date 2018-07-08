import { CustomerService } from './../../services/customer.service';
import {
  Component,
  OnInit,
  AfterViewInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectorRef
} from '@angular/core';
import { CustomerFilter, Sex } from '../../../../shared/models/customer.model';
import { CustomerCriteriaBuilder } from './customer-filter.builder';
declare const $: any;

@Component({
  selector: 'app-customer-filter',
  templateUrl: './customer-filter.component.html',
  styleUrls: ['./customer-filter.component.css']
})
export class CustomerFilterComponent implements AfterViewInit {
  private _customerFilter: CustomerFilter;
  private _resetFunction: () => void;

  @Output() customerFilterChange = new EventEmitter();
  @Output() runFilterClicked = new EventEmitter();

  @Input()
  set customerFilter(value) {
    this._customerFilter = value;
    this.customerFilterChange.emit(this._customerFilter);
  }

  get customerFilter() {
    return this._customerFilter;
  }

  @Input()
  get resetFunction() {
    return this._resetFunction;
  }

  set resetFunction(v: any) {
    this._resetFunction = v;
  }

  memberTypes: any[];
  provinces: any[];
  districts: any[];
  months: any[];
  sexes: any[];

  constructor(
    private customerService: CustomerService,
    private ref: ChangeDetectorRef
  ) {
    this.customerFilter = new CustomerFilter();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.loadData();
    });
  }

  onProvinceChange($event) {
    if ($event) {
      this.districts = $event.districts;
    }
  }

  getSexes() {
    return [
      {
        id: Sex.Female,
        text: Sex[Sex.Female]
      },
      {
        id: Sex.Male,
        text: Sex[Sex.Male]
      },
      {
        id: Sex.Other,
        text: Sex[Sex.Other]
      }
    ];
  }

  loadData() {
    const self = this;
    this.customerService.getMemberType().then((data: any[]) => {
      this.memberTypes = data;
    });
    this.customerService.getProvinces().then((data: any[]) => {
      self.provinces = data;
      if (this.provinces && this.provinces.length > 0) {
        self.districts = this.provinces[0].districts;
      }
    });
    this.customerService.getMonthBirthday().then((data: any[]) => {
      self.months = data;
    });
    this.sexes = this.getSexes();
  }

  runFilter() {
    this.runFilterClicked.emit();
  }

  resetFilter() {
    this.customerFilter = new CustomerFilter();
    this.memberTypes = [];
    this.resetFunction();
  }
}
