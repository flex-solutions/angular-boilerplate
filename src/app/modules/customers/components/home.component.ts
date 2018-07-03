import { Observable } from 'rxjs';
import { IFilterChangedEvent } from './../../../shared/ui-common/datagrid/components/datagrid.component';
import { CustomerService } from './../services/customer.service';
import { Component, OnInit } from '@angular/core';
import {
  CustomerModel,
  CustomerFilter
} from '../../../shared/models/customer.model';
import { CustomerCriteriaBuilder } from './customer-filter/customer-filter-builder';

@Component({
  selector: 'app-customer-home',
  templateUrl: './home.component.html'
})
export class CustomerHomeComponent implements OnInit {
  filter: IFilterChangedEvent;
  public customers: CustomerModel[] = [];
  customerFilter: CustomerFilter;

  constructor(private customerService: CustomerService) {}

  public count = (searchKey: string): Observable<number> => {
    return this.customerService.count(this.getQuery());
  }

  ngOnInit(): void {}

  createNewCustomer() {}

  onPageChanged(event: IFilterChangedEvent) {
    this.filter = event;
    this.getCustomers();
  }

  onRunFilterClicked() {
    this.count('').subscribe(() => {
      this.getCustomers();
    });
  }

  private getQuery() {
    return CustomerCriteriaBuilder.build(this.customerFilter);
  }

  private getCustomers() {
    this.customerService
      .getCustomers(
        this.filter.pagination.page,
        this.filter.pagination.itemsPerPage,
        this.getQuery()
      )
      .subscribe(res => {
        this.customers = res;
      });
  }
}
