import { Component, OnInit } from '@angular/core';

import { Pipe, PipeTransform } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IFilterChangedEvent } from '../../../shared/ui-common/datagrid/components/datagrid.component';
@Pipe({
  name: 'demoFilter'
})
export class FilterPipe implements PipeTransform {
  transform(items: DgTestModel[], searchText: string): any[] {
    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }
    searchText = searchText.toLowerCase();
    return items.filter(it => {
      return it.customer.toLowerCase().includes(searchText)
      || it.shipTo.toLowerCase().includes(searchText);
    });
  }
}

@Component({
  selector: 'app-datagrid-demo',
  templateUrl: 'datagrid-demo.component.html'
})
export class DatagridDemoComponent implements OnInit {
  public items: DgTestModel[] = [];
  constructor() {
    const item1 = new DgTestModel();
    item1.orderNumber = 1;
    item1.basePrice = 5000000;
    item1.customer = 'Think Digital';
    item1.purchasedOn = new Date();
    item1.purchasedPrice = 500000000;
    item1.shipTo = 'Quan 1';
    item1.status = true;

    const item2 = new DgTestModel();
    item2.orderNumber = 2;
    item2.basePrice = 6000000;
    item2.customer = 'SNOB';
    item2.purchasedOn = new Date();
    item2.purchasedPrice = 600000000;
    item2.shipTo = 'Quan go vap';
    item2.status = false;

    this.items = [item1, item2];
  }

  public count = (searchKey: string): Observable<number> => {
    console.log('only should get count when init datagrid of filter changed');
    // call count method in data service class
    return of(300);
  }

  ngOnInit() {}

  onPageChanged(eventArg: IFilterChangedEvent) {
    console.log(eventArg);
  }

}

export class DgTestModel {
  orderNumber: number;
  purchasedOn: Date;
  customer: string;
  shipTo: string;
  basePrice: number;
  purchasedPrice: number;
  status: boolean;
}
