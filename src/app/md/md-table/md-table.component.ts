import { Component, Input, ChangeDetectionStrategy } from '@angular/core';


export interface TableData {
     headerRows: string[];
     dataRows: string[];
}

@Component({
     // tslint:disable-next-line:component-selector
     selector: 'md-table',
     templateUrl: './md-table.component.html',
     changeDetection: ChangeDetectionStrategy.OnPush
})
export class MdTableComponent {
     @Input()
     public title: string;

     @Input()
     public subtitle: string;

     @Input()
     public cardClass: string;

     @Input()
     public data: TableData;

     constructor() { }
}
