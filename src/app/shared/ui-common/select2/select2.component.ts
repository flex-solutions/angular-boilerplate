import {
  Component,
  Input,
  Output,
  EventEmitter,
  AfterViewInit
} from '@angular/core';
import { Guid } from 'guid-typescript';
import { map } from 'rxjs/operators';
declare const $: any;

@Component({
  selector: 'app-select2',
  templateUrl: 'select2.component.html'
})
export class Select2Component implements AfterViewInit {
  private _selectedItem: any;
  private _itemsSource: any[];

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
          data: this.formatDataSource(this._itemsSource)
        });
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

  constructor() {
    this.elementId = Guid.create().toString();
    this.itemsSource = [];
  }

  ngAfterViewInit() {
    this.host.select2();
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
    console.log(data);
    return data;
  }
}
