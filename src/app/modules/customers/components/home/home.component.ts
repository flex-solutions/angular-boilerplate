import { CustomerRouteNames } from '../../constants/customer.constants';
import { CustomerService } from '../../services/customer.service';
import { Observable } from 'rxjs';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {
  CustomerModel,
  CustomerFilter
} from '../../../../shared/models/customer.model';
import {
  IFilterChangedEvent,
  DatagridComponent
} from '../../../../shared/ui-common/datagrid/components/datagrid.component';
import { CustomerCriteriaBuilder } from '../customer-filter/customer-filter.builder';

@Component({
  selector: 'app-customer-home',
  templateUrl: './home.component.html'
})
export class CustomerHomeComponent implements OnInit {
  filter: IFilterChangedEvent;
  customers: CustomerModel[] = [];
  customerFilter: CustomerFilter = new CustomerFilter();
  @ViewChild(DatagridComponent) dataGrid: DatagridComponent;

  constructor(
    private customerService: CustomerService,
    private route: Router
  ) {}

  public count = (searchKey: string): Observable<number> => {
    return this.customerService.count(this.getQuery());
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
    this.loadData();
  }

  private getQuery() {
    const query = CustomerCriteriaBuilder.build(this.customerFilter);
    console.log(query, 2);
    return query;
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

  loadData() {
    this.count('').subscribe(total => {
      this.dataGrid.totalItems = +total;
      this.dataGrid.countPageEntry();
      this.getCustomers();
    });
  }

  resetFilter = () => {
    this.loadData();
  }
}
