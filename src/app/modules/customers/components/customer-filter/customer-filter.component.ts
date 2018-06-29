import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CustomerFilter } from '../../../../shared/models/customer.model';
declare const $: any;

@Component({
  selector: 'app-customer-filter',
  templateUrl: './customer-filter.component.html',
  styleUrls: ['./customer-filter.component.css']
})
export class CustomerFilterComponent implements OnInit, AfterViewInit {

  customerFilter: CustomerFilter;


  constructor() {
    this.customerFilter = new CustomerFilter();
  }

  ngOnInit() {}

  ngAfterViewInit(): void {
    $('.js-example-basic-single').select2();
  }

  runFilter() {}
}
