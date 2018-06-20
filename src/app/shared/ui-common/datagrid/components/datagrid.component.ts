import { TranslateService } from './../../../services/translate.service';
import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  Output,
} from '@angular/core';
import { PageChangedEvent } from '../../pagination/pagination.component';
import { Observable } from 'rxjs';

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
  @Output() pageChanged = new EventEmitter<IFilterChangedEvent>();
  @Input() totalItems: number;
  @Input() searchLabel = 'Search by...';
  @Input() hideSearchInput = false;
  private _countFunction: (searchKey: string) => Observable<number>;

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

  @Input()
  public get countFunction() {
    return this._countFunction;
  }

  public set countFunction(v: any) {
    this._countFunction = v;
  }

  constructor(private translateService: TranslateService) {
    this.searchLabel = translateService.translate('dg-default-search-placeholder');
    this.previousText = translateService.translate('pagination-previous-label');
    this.nextText = translateService.translate('pagination-next-label');
    this.firstText = translateService.translate('pagination-first-label');
    this.lastText = translateService.translate('pagination-last-label');
  }

  ngOnInit() {
    this.countAndRasePageChangedForTheFirstPage();
  }

  submitFilter() {
    if (this.searchKey === this._thePreviouseSearchKey) {
      return;
    }

    this._thePreviouseSearchKey = this.searchKey;

    this.countAndRasePageChangedForTheFirstPage();
  }

  onItemsPerPageChange(itemsPerPage: any) {
    this.itemsPerPage = +itemsPerPage;
    const params = this.getParams();
    params.searchKey = this._thePreviouseSearchKey;
    this.raisePageChangedEventWithParams(params);
  }

  onPageChanged(event: any): void {
    this.currentPage = event.page;
    const params = this.getParams();
    params.searchKey = this._thePreviouseSearchKey;
    this.raisePageChangedEventWithParams(params);
  }

  raisePageChangedEvent() {
    this.countPageEntry();
    const pageChangedEvent = this.getParams();
    this.raisePageChangedEventWithParams(pageChangedEvent);
  }

  raisePageChangedEventWithParams(pageChangedEvent: IFilterChangedEvent) {
    this.countPageEntry();
    this.pageChanged.emit(pageChangedEvent);
  }

  countPageEntry() {
    if (this.totalItems < this.itemsPerPage) {
      if (this.totalItems === 0) {
        this.currentPageEndEntry = this.currentPageStartEntry = 0;
      } else {
        this.currentPageStartEntry = 1;
        this.currentPageEndEntry = this.totalItems;
      }
      return;
    }
    this.currentPageEndEntry = this.currentPage * this.itemsPerPage;
    if (this.currentPageEndEntry > this.totalItems) {
      this.currentPageEndEntry = this.totalItems;
    }
    this.currentPageStartEntry =
      (this.currentPage * this.itemsPerPage) - this.itemsPerPage + 1;
  }

  keyDownFunction(event) {
    if (event.keyCode === 13) {
      this.submitFilter();
    }
  }

  countAndRasePageChangedForTheFirstPage() {
    if (this.countFunction) {
      this.countFunction(this.searchKey).subscribe(result => {
        this.totalItems = result;
        this.raisePageChangedEvent();
      });
    } else {
      this.raisePageChangedEvent();
    }
  }

  getParams(): IFilterChangedEvent {
    const filterChangedEvent: IFilterChangedEvent = {
      pagination: { itemsPerPage: this.itemsPerPage, page: this.currentPage },
      searchKey: this.searchKey
    };

    return filterChangedEvent;
  }
}
