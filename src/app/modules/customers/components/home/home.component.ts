import { CustomerRouteNames } from './../../constants/customer.constants';
import { CustomerService } from './../../services/customer.service';
import { IFilterChangedEvent } from './../../../../shared/ui-common/datagrid/components/datagrid.component';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { CustomerModel } from '../../../../shared/models/customer.model';
import { Router } from '@angular/router';

@Component({
    selector: 'app-customer-home',
    templateUrl: './home.component.html'
})
export class CustomerHomeComponent implements OnInit {
    filter: IFilterChangedEvent;
    public customers: CustomerModel[] = [];

    constructor(private customerService: CustomerService,
        private route: Router) {

    }

    public count = (searchKey: string): Observable<number> => {
        return this.customerService.count();
    }

    ngOnInit(): void {
    }

    createNewCustomer() {
        this.route.navigate([CustomerRouteNames.CREATE]);
    }

    editCustomer(id: string) {
        this.route.navigate([`${CustomerRouteNames.EDIT}/${id}`]);
    }

    onPageChanged(event: IFilterChangedEvent) {
        this.filter = event;
        this.getCustomers();
    }

    private getCustomers() {
        this.customerService.getCustomers(this.filter.pagination.page, this.filter.pagination.itemsPerPage).subscribe(res => {
            this.customers = res;
            console.log(this.customers);
        });
    }
}
