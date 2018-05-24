import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-datagrid-demo',
    templateUrl: 'datagrid-demo.component.html'
})
export class DatagridDemoComponent implements OnInit {

    public items: DgTestModel[] = [];
    public totalItems: 100;
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

    ngOnInit() {

    }

    onPageChanged(eventArg: any) {
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
