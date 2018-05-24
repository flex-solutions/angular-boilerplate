import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoaderComponent } from './loading-bar/loader.component';
import { LoaderService } from './loading-bar/loader.service';
import { NgModule } from '@angular/core';
import { DialogModule } from './modal/dialog.module';
import { DatagridModule } from './datagrid/datagrid.module';
import { CardComponent } from './card/card.component';
import { PaginationModule } from './pagination/pagination.module';

@NgModule({
  imports: [CommonModule, RouterModule],
  exports: [
    LoaderComponent, CardComponent,
    DialogModule, DatagridModule, PaginationModule
  ],
  declarations: [
    LoaderComponent,
    CardComponent
  ],
  providers: [
    LoaderService
  ]
})
export class UICommonModule {}
