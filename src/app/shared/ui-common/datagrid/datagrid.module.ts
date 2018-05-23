import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DatagridComponent } from './components/datagrid.component';
import { SharedModule } from '../../shared.module';

@NgModule({
  imports: [CommonModule],
  exports: [
      DatagridComponent,
  ],
  declarations: [
    DatagridComponent,
  ],
  providers: []
})
export class DatagridModule {}
