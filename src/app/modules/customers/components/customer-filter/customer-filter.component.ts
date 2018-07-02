import { CustomerService } from './../../services/customer.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CustomerFilter, Sex } from '../../../../shared/models/customer.model';
import { CustomerCriteriaBuilder } from './customer-filter-builder';
declare const $: any;

@Component({
  selector: 'app-customer-filter',
  templateUrl: './customer-filter.component.html',
  styleUrls: ['./customer-filter.component.css']
})
export class CustomerFilterComponent implements OnInit, AfterViewInit {
  customerFilter: CustomerFilter;
  memberType: any[];
  provinces: any[];
  districts: any[];
  months: any[];

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

  ngAfterViewInit(): void {}

  onProvinceChange($event) {
    if ($event) {
      this.districts = $event.districts;
    }
  }

  get sexes() {
    return [Sex.Male, Sex.Female, Sex.Other];
  }

  sexAsString(item) {
    return Sex[item];
  }

  runFilter() {
    console.log(this.customerFilter);
    // const builder = CustomerCriteriaBuilder.build(this.customerFilter);

    // Todo call api count and filter to run filter
  }

  get selectHost() {
    return $('.js-example-basic-single');
  }
}
