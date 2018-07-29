import {
  OnInit,
  EventEmitter,
  Output,
  Input,
  AfterViewInit
} from '@angular/core';

export abstract class AbstractFilterComponent<T>
  implements OnInit, AfterViewInit {
  private _filter: T;
  private _resetFunction: () => void;

  // Call when custom filter change
  @Output() filterChange = new EventEmitter();

  // Call when button run filter have clicked
  @Output() runFilterClicked = new EventEmitter();

  // Get and set customer filter property
  @Input()
  set filter(value) {
    this._filter = value;
    this.filterChange.emit(this._filter);
  }

  get filter() {
    return this._filter;
  }

  // Get and set reset callback function
  @Input()
  get resetFunction() {
    return this._resetFunction;
  }

  set resetFunction(v: any) {
    this._resetFunction = v;
  }

  constructor() {}

  ngOnInit() {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.loadData();
    });
  }

  loadData() {}

  runFilter() {
    this.onRunFilter();
    this.runFilterClicked.emit();
  }

  resetFilter() {
    this.onResetFilter();
    this.resetFunction();
  }

  onResetFilter() {}
  onRunFilter() {}
}
