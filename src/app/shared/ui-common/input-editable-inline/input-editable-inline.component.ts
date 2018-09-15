import {
  Component,
  Input,
  EventEmitter,
  Output,
  AfterViewInit
} from '@angular/core';
import { Guid } from 'guid-typescript';
declare let $: any;

@Component({
  selector: 'app-input-editable',
  templateUrl: './input-editable-inline.component.html',
  styleUrls: ['./input-editable-inline.component.css']
})
export class InputEditableInlineComponent implements AfterViewInit {
  private _value: string;
  private _isNumberOnly: boolean;
  elementId: string;

  @Output()
  valueChange = new EventEmitter();

  @Input()
  set value(val) {
    this._value = val;
    this.valueChange.emit(val);
  }

  get value() {
    return this._value;
  }

  @Input()
  set isNumberOnly(val) {
    this._isNumberOnly = val;
  }

  get isNumberOnly() {
    return this._isNumberOnly;
  }

  constructor() {
    this.elementId = Guid.create().toString();
    this._isNumberOnly = false;
  }

  ngAfterViewInit() {
    if ($('#editable-form').length) {
      $.fn.editable.defaults.mode = 'inline';
      $.fn.editableform.buttons = `
      <button type="submit" class="btn btn-success editable-submit"><i class="mdi mdi-check"></i></button>
      <button type="button" class="btn btn-light editable-cancel"><i class="mdi mdi-refresh"></i></button>
      `;
      $(`#${this.elementId}`).editable({
        validate: val => {
          if (this.isNumberOnly && $.isNumeric(val) == '') {
            return '  ';
          }
          this.value = val;
        }
      });
    }
  }
}
