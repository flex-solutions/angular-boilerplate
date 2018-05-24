import { TranslateService } from './../../../services/translate.service';
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
export class DatagridComponent implements OnInit {
  @Output() pageChanged = new EventEmitter<PageChangedEvent>();
  @Output() filterChanged = new EventEmitter<IFilterChangedEvent>();
  @Input() totalItems: number;
  @Input() searchLabel = 'Search by...';

  previousText: string;
  nextText: string;
  firstText: string;
  lastText: string;

  private _thePreviouseSearchKey: string;
  private _searchKey: string;

  itemsPerPage = 10;
  currentPage = 1;
  currentPageStartEntry = 0;
  currentPageEndEntry = 0;

  @Input()
  public get searchKey() {
    return this._searchKey;
  }

  public set searchKey(v: any) {
    this._searchKey = v;
  }

  constructor(private translateService: TranslateService) {
    this.searchLabel = translateService.translate('dg-default-search-placeholder');
    this.previousText = translateService.translate('pagination-previous-label');
    this.nextText = translateService.translate('pagination-next-label');
    this.firstText = translateService.translate('pagination-first-label');
    this.lastText = translateService.translate('pagination-last-label');
  }

  ngOnInit() {
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
