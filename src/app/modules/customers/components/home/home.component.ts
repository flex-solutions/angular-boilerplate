import { CustomerRouteNames } from './../../constants/customer.constants';
import { CustomerService } from './../../services/customer.service';
import { IFilterChangedEvent } from './../../../../shared/ui-common/datagrid/components/datagrid.component';
import { Observable } from 'rxjs';
<<<<<<< HEAD:src/app/modules/customers/components/home/home.component.ts
import { Component, OnInit } from '@angular/core';
import { CustomerModel } from '../../../../shared/models/customer.model';
import { Router } from '@angular/router';
=======
import {
  IFilterChangedEvent,
  DatagridComponent
} from './../../../shared/ui-common/datagrid/components/datagrid.component';
import { CustomerService } from './../services/customer.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  CustomerModel,
  CustomerFilter
} from '../../../shared/models/customer.model';
import { CustomerCriteriaBuilder } from './customer-filter/customer-filter.builder';
>>>>>>> feature/develop_spr003:src/app/modules/customers/components/home.component.ts

@Component({
  selector: 'app-customer-home',
  templateUrl: './home.component.html'
})
export class CustomerHomeComponent implements OnInit {
  private _hasUseFilter: boolean;
  filter: IFilterChangedEvent;
  customers: CustomerModel[] = [];
  customerFilter: CustomerFilter = new CustomerFilter();
  @ViewChild(DatagridComponent) dataGrid: DatagridComponent;

<<<<<<< HEAD:src/app/modules/customers/components/home/home.component.ts
    constructor(private customerService: CustomerService,
        private route: Router) {

    }

    public count = (searchKey: string): Observable<number> => {
        return this.customerService.count();
    }

    ngOnInit(): void {
=======
  constructor(private customerService: CustomerService) {
    this._hasUseFilter = false;
  }

  public count = (searchKey: string): Observable<number> => {
    if (!this._hasUseFilter) {
      return this.customerService.count();
>>>>>>> feature/develop_spr003:src/app/modules/customers/components/home.component.ts
    }
    return this.customerService.countWithFilterQuery(this.getQuery());
  }

<<<<<<< HEAD:src/app/modules/customers/components/home/home.component.ts
    createNewCustomer() {
        this.route.navigate([CustomerRouteNames.CREATE]);
    }

    editCustomer(id: string) {
        this.route.navigate([`${CustomerRouteNames.EDIT}/${id}`]);
    }
=======
  ngOnInit(): void {}
>>>>>>> feature/develop_spr003:src/app/modules/customers/components/home.component.ts

  createNewCustomer() {}

  onPageChanged(event: IFilterChangedEvent) {
    this.filter = event;
    this.getCustomers();
  }

  onRunFilterClicked() {
    this._hasUseFilter = true;
    this.loadData();
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

  loadData() {
    this.count('').subscribe(total => {
      this.dataGrid.totalItems = +total;
      this.dataGrid.countPageEntry();
      this.getCustomers();
    });
  }

  resetFilter = () => {
    this._hasUseFilter = false;
    this.loadData();
  }
}
