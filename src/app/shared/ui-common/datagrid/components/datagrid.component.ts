import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  Output,
  AfterViewInit
} from '@angular/core';
import { PaginationConfig } from '../../pagination/pagination.config';
import { PageChangedEvent } from '../../pagination/pagination.component';

@Component({
  selector: 'app-dg',
  templateUrl: 'datagrid.component.html'
})
export class DatagridComponent implements OnInit, AfterViewInit {
  @Output() pageChanged = new EventEmitter<PageChangedEvent>();
  @Input() totalItems: number;
  itemsPerPage = 10;

  currentPage = 1;

  constructor() {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.raisePageChangedEvent();
  }

  onItemsPerPageChange(itemsPerPage: any) {
    this.itemsPerPage = +itemsPerPage;
    this.raisePageChangedEvent();
  }
  onPageChanged(event: any): void {
    this.currentPage = event.page;
    this.raisePageChangedEvent();
  }
  raisePageChangedEvent() {
    const pageChangedEvent: PageChangedEvent = {
      itemsPerPage: this.itemsPerPage,
      page: this.currentPage
    };
    this.pageChanged.emit(pageChangedEvent);
  }
}
