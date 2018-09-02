import {
  Component,
  Input,
  Output,
  EventEmitter,
  AfterViewInit
} from '@angular/core';
import { Guid } from 'guid-typescript';
import { isNullOrEmptyOrUndefined } from '../../../utilities/util';
import { isEmpty, forEach, remove, eq, map } from 'lodash';
declare const $: any;

@Component({
  selector: 'app-select2-multiple',
  template: `<div style="display:flex">
  <select id="{{elementId}}" style="width:100%;"></select>
  <button style="margin-left:5px;border-color: #f3f3f3;"
  type="button" class="btn" (click)="reset()"><i class="mdi mdi-close" style="margin-right:0px"></i></button>
  </div>`
})
export class Select2MultipleComponent implements AfterViewInit {
  private _selectedItems: any[] = [];
  private _itemsSource: any[] = [];
  private _placeholder: string;
  private _displayPropertyName: string;
  private _valuePropertyName: string;

  elementId: string;

  @Output()
  selectedItemsChange = new EventEmitter();
  @Output()
  itemsSourceChange = new EventEmitter();

  @Input()
  set itemsSource(value) {
    this._itemsSource = value;
    this.itemsSourceChange.emit(this._itemsSource);
    this.host
      .select2('destroy')
      .empty()
      .select2({
        placeholder: this._placeholder,
        data: this.formatDataSource(this._itemsSource),
        multiple: true,
        closeOnSelect: false
      });

    if (!isEmpty(this.selectedItems)) {
      this.onSelectedItemChange();
    } else {
      this.host.val(null).trigger('change');
    }
  }

  get itemsSource() {
    return this._itemsSource;
  }

  @Input()
  set selectedItems(val) {
    this._selectedItems = val;
    this.selectedItemsChange.emit(this._selectedItems);

    this.onSelectedItemChange();
  }
  get selectedItems() {
    return this._selectedItems;
  }

  @Input()
  set placeHolder(val) {
    this._placeholder = val;
  }

  get placeHolder() {
    return this._placeholder;
  }

  @Input()
  set displayPropertyName(val) {
    this._displayPropertyName = val;
  }
  get displayPropertyName() {
    return this._displayPropertyName;
  }

  @Input()
  set valuePropertyName(val) {
    this._valuePropertyName = val;
  }
  get valuePropertyName() {
    return this._valuePropertyName;
  }

  constructor() {
    this.elementId = Guid.create().toString();
  }

  ngAfterViewInit() {
    this._placeholder = 'Select a value';
    this.host.select2({
      placeholder: this._placeholder,
      allowClear: true,
      multiple: true,
      closeOnSelect: false
    });
    this.host.on('select2:select', e => {
      const data = e.params.data;
      const selectedItem = this.itemsSource.find(i => i.id === data.id);
      this.selectedItems.push(selectedItem);
      this.selectedItemsChange.emit(this.selectedItems);
    });
    this.host.on('select2:unselect', e => {
      const data = e.params.data;
      remove(this.selectedItems, item => eq(item.id, data.id));
      this.selectedItemsChange.emit(this.selectedItems);
    });
  }

  get host() {
    return $(`select[id="${this.elementId}"]`);
  }

  // Because select2 using format {id: string; text: string}
  formatDataSource(arrayData: any[]) {
    if (isNullOrEmptyOrUndefined(arrayData)) {
      return [];
    }
    const data = arrayData.map(obj => {
      return this.buildObjForSelect2(obj);
    });
    return data;
  }

  buildSelect2Data(items: any[]) {
    if (isEmpty(items)) {
      return items;
    }

    forEach(items, item => {
      item = this.buildObjForSelect2(item);
    });
    return items;
  }

  buildObjForSelect2(item: any) {
    if (!isNullOrEmptyOrUndefined(this.valuePropertyName)) {
      item.id = item[this.valuePropertyName];
    } else if (!item.hasOwnProperty('id')) {
      item.id = item._id || item.key;
    }

    if (!isNullOrEmptyOrUndefined(this.displayPropertyName)) {
      item.text = item[this.displayPropertyName];
    } else if (!item.hasOwnProperty('text')) {
      // Use default behavior
      item.text = item.name || item.displayName;
    }

    return item;
  }

  reset() {
    this.host.val(null).trigger('change');
    remove(this.selectedItems, item => item.id);
  }

  onSelectedItemChange() {
    const temps = this.buildSelect2Data(this._selectedItems);
    if (!isEmpty(temps)) {
      const selectedValues = map(temps, val => val.id);
      this.host
        .select2()
        .val(selectedValues)
        .trigger('change');
    } else {
      this.host.val(null).trigger('change');
    }
  }
}
