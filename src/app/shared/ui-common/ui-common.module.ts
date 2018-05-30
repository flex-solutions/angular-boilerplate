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

@NgModule({
  imports: [CommonModule, RouterModule],
  exports: [
    LoaderComponent, CardComponent, RadioButtonComponent,
    DialogModule, DatagridModule, PaginationModule
  ],
  declarations: [
    LoaderComponent,
    CardComponent,
    RadioButtonComponent
  ],
  providers: [
    LoaderService
  ]
})
export class UICommonModule {}
