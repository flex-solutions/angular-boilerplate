import {
  Component,
  Input,
  Output,
  EventEmitter,
  AfterViewInit
} from '@angular/core';
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
}
