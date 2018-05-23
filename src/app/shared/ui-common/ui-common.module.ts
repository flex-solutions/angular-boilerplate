import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoaderComponent } from './loading-bar/loader.component';
import { LoaderService } from './loading-bar/loader.service';
import { NgModule } from '@angular/core';
import { DialogModule } from './modal/dialog.module';
import { DatagridModule } from './datagrid/datagrid.module';
import { CardComponent } from './card/card.component';

@NgModule({
  imports: [CommonModule, RouterModule],
  exports: [
    LoaderComponent, DialogModule, DatagridModule, CardComponent
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
