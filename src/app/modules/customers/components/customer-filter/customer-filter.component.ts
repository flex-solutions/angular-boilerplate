import { CustomerService } from './../../services/customer.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CustomerFilter, Sex } from '../../../../shared/models/customer.model';
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
  }

  ngAfterViewInit(): void {
    this.selectHost.select2();
    this.selectHost.on('select2:select', e => {
      const data = e.params.data;
      this.districts = this.provinces[data.id].districts;
    });
  }

  get sexes() {
    return [Sex.Male, Sex.Female, Sex.Other];
  }

  sexAsString(item) {
    return Sex[item];
  }

  runFilter() {}

  get selectHost() {
    return $('.js-example-basic-single');
  }
}
