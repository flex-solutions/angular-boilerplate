import {
  Component,
  Input,
  Output,
  EventEmitter,
  AfterViewInit
} from '@angular/core';
import { isNullOrEmptyOrUndefined } from '../../../utilities/util';
declare const $: any;

export class Range {
  from: number;
  to: number;
}

@Component({
  selector: 'app-input-range',
  templateUrl: 'input-range.component.html',
  styleUrls: ['input-range.component.css']
})
export class InputRangeComponent implements AfterViewInit {
  private _range: Range;
  hasError: boolean;

  @Output()
  rangeChange = new EventEmitter();

  @Input()
  title: string;

  @Input()
  set range(val) {
    this._range = val;
    this.rangeChange.emit(this._range);
  }
  get range(): Range {
    return this._range;
  }

  constructor() {
    this._range = new Range();
    this.hasError = false;
  }

  ngAfterViewInit() {}

  onFromChange($event) {
    this._validate();
  }

  onToChange($event) {
    this._validate();
  }

  private _validate() {
    if (
      isNullOrEmptyOrUndefined(this._range.from) ||
      isNullOrEmptyOrUndefined(this._range.to)
    ) {
      this.hasError = false;
      return;
    }

    if (this._range.from < this._range.to) {
      this.hasError = false;
      return;
    }

    this.hasError = true;
  }
}
