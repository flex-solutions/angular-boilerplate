import { CustomerService } from './../../services/customer.service';
import {
  Component,
  OnInit,
  AfterViewInit,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { CustomerFilter, Sex } from '../../../../shared/models/customer.model';
import { CustomerCriteriaBuilder } from './customer-filter-builder';
declare const $: any;

@Component({
  selector: 'app-customer-filter',
  templateUrl: './customer-filter.component.html',
  styleUrls: ['./customer-filter.component.css']
})
export class CustomerFilterComponent implements OnInit, AfterViewInit {
  private _customerFilter: CustomerFilter;

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

  memberType: any[];
  provinces: any[];
  districts: any[];
  months: any[];
  sexes: any[];

  constructor(private customerService: CustomerService) {
    this.customerFilter = new CustomerFilter();
  }

  ngOnInit() {
    this.customerService.getMemberType().then((data: any[]) => {
      this.memberType = data;
    });
    this.customerService.getProvinces().then((data: any[]) => {
      this.provinces = data;
      if (this.provinces && this.provinces.length > 0) {
        this.districts = this.provinces[0].districts;
      }
    });
    this.customerService.getMonthBirthday().then((data: any[]) => {
      this.months = data;
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.sexes = this.getSexes();
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

  runFilter() {
    this.runFilterClicked.emit();
  }

  get selectHost() {
    return $('.js-example-basic-single');
  }
}
