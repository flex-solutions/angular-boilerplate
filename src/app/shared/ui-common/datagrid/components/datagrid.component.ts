import { Component, OnInit, Input } from '@angular/core';
import { PaginationConfig } from '../../pagination/pagination.config';

@Component({
    selector: 'app-dg',
    templateUrl: 'datagrid.component.html'
})

export class DatagridComponent implements OnInit {

    @Input() totalItems: number;
    itemsPerPage: number;

    constructor() { }

    ngOnInit() { }
}
