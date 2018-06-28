import { Observable } from 'rxjs';
import { IFilterChangedEvent } from './../../../shared/ui-common/datagrid/components/datagrid.component';
import { CustomerService } from './../services/customer.service';
import { Component, OnInit } from '@angular/core';
import { CustomerModel } from '../../../shared/models/customer.model';

@Component({
  selector: 'app-customer-home',
  templateUrl: './home.component.html'
})
export class CustomerHomeComponent implements OnInit {
  filter: IFilterChangedEvent;
  public customers: CustomerModel[] = [];

  constructor(private customerService: CustomerService) {}

  public count = (searchKey: string): Observable<number> => {
    return this.customerService.count();
  }

  ngOnInit(): void {}

  createNewCustomer() {}

  onPageChanged(event: IFilterChangedEvent) {
    this.filter = event;
    this.getCustomers();
  }

  private getCustomers() {
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
