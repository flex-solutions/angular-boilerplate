import { CustomerRouteNames } from './../../constants/customer.constants';
import { CustomerService } from './../../services/customer.service';
import { Observable } from 'rxjs';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerModel, CustomerFilter } from '../../../../shared/models/customer.model';
import { IFilterChangedEvent, DatagridComponent } from '../../../../shared/ui-common/datagrid/components/datagrid.component';
import { CustomerCriteriaBuilder } from '../customer-filter/customer-filter.builder';

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

  constructor(private customerService: CustomerService, private route: Router) {
    this._hasUseFilter = false;
  }

  public count = (searchKey: string): Observable<number> => {
    if (!this._hasUseFilter) {
      return this.customerService.count();
    }
    return this.customerService.countWithFilterQuery(this.getQuery());
  }

    createNewCustomer() {
        this.route.navigate([CustomerRouteNames.CREATE]);
    }

    editCustomer(id: string) {
        this.route.navigate([`${CustomerRouteNames.EDIT}/${id}`]);
    }
  ngOnInit(): void {}

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
          console.log(this.customers);
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
