import { CheckedItem } from './checked-items.model';
import { SelectableModel } from '../../models/selectable.model';
import {
  Component,
  Input,
  AfterContentInit,
  EventEmitter,
  Output
} from '@angular/core';

@Component({
  selector: 'app-drop-down-check-boxes',
  templateUrl: './drop-down-check-boxes.component.html',
  styleUrls: ['./drop-down-check-boxes.component.css']
})
export class DropDownCheckBoxesComponent implements AfterContentInit {
  private _itemSources: SelectableModel<CheckedItem>[];

  // A title display on control
  @Input() title: string;

  // The list items source bind to list check boxes
  @Output() itemSourcesChange = new EventEmitter();

  @Input()
  set itemSources(val) {
    this._itemSources = val;
    this.itemSourcesChange.emit(this._itemSources);
    this.onCheckedChanged();
  }

  get itemSources() {
    return this._itemSources;
  }

  // Call when date have changed
  @Output() selectedItemsChange = new EventEmitter<CheckedItem[]>();

  private _selectedItems: CheckedItem[];

  get selectedItems() {
    return this._selectedItems;
  }
  @Input()
  set selectedItems(value: CheckedItem[]) {
    if (value !== this._selectedItems) {
      this._selectedItems = value;
      this.selectedItemsChange.emit(this._selectedItems);
    }
  }

  values: string;

  constructor() {
    this.itemSources = [];
  }

  ngAfterContentInit(): void {
    setTimeout(() => {
      this.onCheckedChanged();
    });
  }

  onCheckedChanged() {
    this.selectedItems = this.itemSources
      .filter(i => i.isSelected)
      .map(i => i.model);
    this.values = this.selectedItems.map(i => i.displayName).join(', ');
  }
}
