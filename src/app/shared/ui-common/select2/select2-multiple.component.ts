import {
  Component,
  Input,
  Output,
  EventEmitter,
  AfterViewInit
} from '@angular/core';
import { Guid } from 'guid-typescript';
import { isNullOrEmptyOrUndefine } from '../../../utilities/util';
import { isEmpty, forEach } from 'lodash';
declare const $: any;

@Component({
  selector: 'app-select2-multiple',
  template: '<select id="{{elementId}}" style="width:100%"></select>'
})
export class Select2MultipleComponent implements AfterViewInit {
  private _selectedItems: any[] = [];
  private _itemsSource: any[] = [];
  private _placeholder: string;
  private _displayPropertyName: string;
  private _valuePropertyName: string;

  elementId: string;

  @Output()
  selectedItemChange = new EventEmitter();
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
    this.selectedItemChange.emit(this._selectedItems);

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
      this.selectedItems.push(data);
    });
  }

  get host() {
    return $(`select[id="${this.elementId}"]`);
  }

  // Because select2 using format {id: string; text: string}
  formatDataSource(arrayData: any[]) {
    if (isNullOrEmptyOrUndefine(arrayData)) {
      return [];
    }
    const data = arrayData.map(obj => {
      return this.buldObjForSelect2(obj);
    });
    return data;
  }

  buildSelect2Data(items: any[]) {
    if (isEmpty(items)) {
      return items;
    }

    forEach(items, item => {
      item = this.buldObjForSelect2(item);
    });
    return items;
  }

  buldObjForSelect2(item: any) {
    if (!isNullOrEmptyOrUndefine(this.valuePropertyName)) {
      item.id = item[this.valuePropertyName];
    } else if (!item.hasOwnProperty('id')) {
      item.id = item._id || item.key;
    }

    if (!isNullOrEmptyOrUndefine(this.displayPropertyName)) {
      item.text = item[this.displayPropertyName];
    } else if (!item.hasOwnProperty('text')) {
      // Use default behavior
      item.text = item.name || item.displayName;
    }

    return item;
  }

  reset() {
    this.host.val(null).trigger('change');
    this.selectedItems = [];
  }

  onSelectedItemChange() {
    const temps = this.buildSelect2Data(this._selectedItems);
    if (!isEmpty(temps)) {
      this.host.val(temps).trigger('change');
    }
  }
}
