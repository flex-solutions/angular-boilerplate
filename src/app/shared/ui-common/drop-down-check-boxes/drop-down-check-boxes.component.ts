import { CheckedItem } from './checked-items.model';
import { SelectableModel } from './../../models/selectable.model';
import { Component, Input, AfterContentInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-drop-down-check-boxes',
  templateUrl: './drop-down-check-boxes.component.html',
  styleUrls: ['./drop-down-check-boxes.component.css']
})
export class DropDownCheckBoxesComponent implements AfterContentInit {

  // A title display on control
  @Input()
  title: string;

  // The list items source bind to list check boxes
  @Input()
  itemsources: SelectableModel<CheckedItem>[];

  // Call when date have changed
  @Output()
  selectedItemsChange = new EventEmitter<CheckedItem[]>();

  private _selectedItems: CheckedItem[];

  @Input()
  get selectedItems() {
    return this._selectedItems;
  }

  set selectedItems(value: CheckedItem[]) {
    if (value !== this._selectedItems) {
      this._selectedItems = value;
      this.selectedItemsChange.emit(this._selectedItems);
    }
  }

  values: string;

  constructor() {
    this.itemsources = [];
  }

  ngAfterContentInit(): void {
    setTimeout(() => {
      this.onCheckedChanged();
    });
  }

  onCheckedChanged() {
    this.selectedItems = this.itemsources.filter(i => i.isSelected).map(i => i.model);
    this.values = this.selectedItems.map(i => i.displayName).join(', ');
  }

}
