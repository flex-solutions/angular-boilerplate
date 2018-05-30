import { SearchTextboxComponent } from './search-textbox/search-textbox.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoaderComponent } from './loading-bar/loader.component';
import { LoaderService } from './loading-bar/loader.service';
import { NgModule } from '@angular/core';
import { DialogModule } from './modal/dialog.module';
import { DatagridModule } from './datagrid/datagrid.module';
import { CardComponent } from './card/card.component';
import { PaginationModule } from './pagination/pagination.module';
import { RadioButtonComponent } from './radiobutton/radio.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, RouterModule, FormsModule],
  exports: [
    LoaderComponent, CardComponent, RadioButtonComponent,
    SearchTextboxComponent,
    DialogModule, DatagridModule, PaginationModule
  ],
  declarations: [
    LoaderComponent,
    CardComponent,
    RadioButtonComponent,
    SearchTextboxComponent
  ],
  providers: [
    LoaderService
  ]
})
export class UICommonModule {}
