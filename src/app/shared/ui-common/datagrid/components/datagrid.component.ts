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
  templateUrl: 'datagrid.component.html',
  styleUrls: ['datagrid.component.css']
})
export class DatagridComponent implements OnInit, AfterViewInit {
  @Output() pageChanged = new EventEmitter<PageChangedEvent>();
  @Input() totalItems: number;
  @Input() searchLabel = 'Search by...';

  private _searchKey: string;

  itemsPerPage = 10;
  currentPage = 1;
  currentPageStartEntry: number;
  currentPageEndEntry: number;

  @Input()
  public get searchKey() {
    return this._searchKey;
  }

  public set searchKey(v: any) {
    this._searchKey = v;
  }

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
    this.countPageEntry();
    const pageChangedEvent: PageChangedEvent = {
      itemsPerPage: this.itemsPerPage,
      page: this.currentPage
    };
    this.pageChanged.emit(pageChangedEvent);
  }
  countPageEntry() {
    this.currentPageEndEntry = this.currentPage * this.itemsPerPage;
    this.currentPageStartEntry = this.currentPageEndEntry - this.itemsPerPage + 1;
  }
}
