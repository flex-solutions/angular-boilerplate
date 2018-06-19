import { CheckedItem } from './checked-items.model';
import { SelectableModel } from './../../models/selectable.model';
import { Component, Input, AfterContentInit } from '@angular/core';

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

  values: string;

  constructor() {
    this.itemsources = [];
  }

  ngAfterContentInit(): void {
    this.onCheckedChanged();
  }

  onCheckedChanged() {
    this.values = this.itemsources.filter(i => i.isSelected).map(i => i.model.displayName).join(', ');
  }

}
