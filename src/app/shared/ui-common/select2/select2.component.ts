import {
  Component,
  Input,
  Output,
  EventEmitter,
  AfterViewInit
} from '@angular/core';
import { Guid } from 'guid-typescript';
import { isNullOrEmptyOrUndefine } from '../../../utilities/util';
declare const $: any;

@Component({
  selector: 'app-select2',
  templateUrl: 'select2.component.html'
})
export class Select2Component implements AfterViewInit {
  private _selectedItem: any;
  private _itemsSource: any[];
  private _placeholder: string;

  elementId: string;

  @Output() selectedItemChange = new EventEmitter();
  @Output() itemsSourceChange = new EventEmitter();

  @Input()
  set itemsSource(value) {
    this._itemsSource = value;
    this.itemsSourceChange.emit(this._itemsSource);
    if (this._itemsSource && this._itemsSource.length > 0) {
      this.host
        .select2('destroy')
        .empty()
        .select2({
          placeholder: this._placeholder,
          data: this.formatDataSource(this._itemsSource)
        });
      this.reset();
    }
  }

  get itemsSource() {
    return this._itemsSource;
  }

  @Input()
  set selectedItem(val) {
    this._selectedItem = val;
    this.selectedItemChange.emit(this._selectedItem);
  }
  get selectedItem() {
    return this._selectedItem;
  }

  @Input()
  set placeHolder(val) {
    this._placeholder = val;
  }

  get placeHolder() {
    return this._placeholder;
  }

  constructor() {
    this.elementId = Guid.create().toString();
    this.itemsSource = [];
  }

  ngAfterViewInit() {
    this._placeholder = 'Select a value';
    this.host.select2({
      placeholder: this._placeholder,
      allowClear: true
    });
    this.host.on('select2:select', e => {
      const data = e.params.data;
      this.selectedItem = data;
    });
  }

  get host() {
    return $(`select[id="${this.elementId}"]`);
  }

  // Because select2 using format {id: string; text: string}
  formatDataSource(arrayData: any[]) {
    const data = arrayData.map(obj => {
      if (!obj.hasOwnProperty('id')) {
        obj.id = obj._id || obj.key;
      }
      if (!obj.hasOwnProperty('text')) {
        obj.text = obj.name || obj.displayName;
      }
      return obj;
    });
    return data;
  }

  reset() {
    this.host.val(null).trigger('change');
    setTimeout(() => {
      this.selectedItem = {};
    });
  }
}
