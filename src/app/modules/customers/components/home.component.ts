import { Observable } from 'rxjs';
import { IFilterChangedEvent } from './../../../shared/ui-common/datagrid/components/datagrid.component';
import { CustomerService } from './../services/customer.service';
import { Component, OnInit } from '@angular/core';
import {
  CustomerModel,
  CustomerFilter
} from '../../../shared/models/customer.model';
import { CustomerCriteriaBuilder } from './customer-filter/customer-filter.builder';

@Component({
  selector: 'app-customer-home',
  templateUrl: './home.component.html'
})
export class CustomerHomeComponent implements OnInit {
  private _hasUseFilter: boolean;
  filter: IFilterChangedEvent;
  customers: CustomerModel[] = [];
  customerFilter: CustomerFilter = new CustomerFilter();

  constructor(private customerService: CustomerService) {
    this._hasUseFilter = false;
  }

  public count = (searchKey: string): Observable<number> => {
    if (!this._hasUseFilter) {
      return this.customerService.count();
    }
    return this.customerService.countWithFilterQuery(this.getQuery());
  }

  ngOnInit(): void {}

  createNewCustomer() {}

  onPageChanged(event: IFilterChangedEvent) {
    this.filter = event;
    this.getCustomers();
  }

  onRunFilterClicked() {
    this._hasUseFilter = true;
    this.count('').subscribe(() => {
      this.getCustomers();
    });
  }

  private getQuery() {
    const query = CustomerCriteriaBuilder.build(this.customerFilter);
    return query;
  }

  private getCustomers() {
    if (this._hasUseFilter) {
      this.customerService
        .getCustomersWithFilterQuery(
          this.filter.pagination.page,
          this.filter.pagination.itemsPerPage,
          this.getQuery()
        )
        .subscribe(res => {
          this.customers = res;
        });
    } else {
      this.customerService
        .getCustomers(
          this.filter.pagination.page,
          this.filter.pagination.itemsPerPage
        )
        .subscribe(res => {
          this.customers = res;
        });
    }
  }

  resetFilter = () => {
    this._hasUseFilter = false;
    this.count('').subscribe(() => {
      this.getCustomers();
    });
  }
}
