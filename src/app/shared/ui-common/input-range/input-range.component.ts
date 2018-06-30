import {
  Component,
  Input,
  Output,
  EventEmitter,
  AfterViewInit
} from '@angular/core';
import { isNullOrEmptyOrUndefine } from '../../../utilities/util';
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

  @Output() rangeChange = new EventEmitter();

  @Input() title: string;

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

  ngAfterViewInit() {
    $('input.number-only').bind({
      keydown: function(e) {
        if (e.shiftKey === true) {
          if (e.which === 9) {
            return true;
          }
          return false;
        }
        if (e.which > 57) {
          return false;
        }
        if (e.which === 32) {
          return false;
        }
        return true;
      }
    });
  }

  onFromChange($event) {
    this._validate();
  }

  onToChange($event) {
    this._validate();
  }

  private _validate() {
    if (
      isNullOrEmptyOrUndefine(this._range.from) ||
      isNullOrEmptyOrUndefine(this._range.to)
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
