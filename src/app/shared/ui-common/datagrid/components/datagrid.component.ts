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

export interface IFilterChangedEvent {
  pagination: PageChangedEvent;
  searchKey: string;
}

@Component({
  selector: 'app-dg',
  templateUrl: 'datagrid.component.html',
  styleUrls: ['datagrid.component.css']
})
export class DatagridComponent implements OnInit, AfterViewInit {
  @Output() pageChanged = new EventEmitter<PageChangedEvent>();
  @Output() filterChanged = new EventEmitter<IFilterChangedEvent>();
  @Input() totalItems: number;
  @Input() searchLabel = 'Search by...';

  private _thePreviouseSearchKey: string;
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
  submitFilter() {
    if (this.searchKey === this._thePreviouseSearchKey) {
      return;
    }

    this._thePreviouseSearchKey = this.searchKey;

    const filterChangedEvent: IFilterChangedEvent = {
      pagination: { itemsPerPage: this.itemsPerPage, page: this.currentPage },
      searchKey: this.searchKey
    };
    this.filterChanged.emit(filterChangedEvent);
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
    this.currentPageStartEntry =
      this.currentPageEndEntry - this.itemsPerPage + 1;
  }

  keyDownFunction(event) {
    if (event.keyCode === 13) {
      this.submitFilter();
    }
  }
}
