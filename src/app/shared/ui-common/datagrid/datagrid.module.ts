import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DatagridComponent } from './components/datagrid.component';
import { SharedModule } from '../../shared.module';
import { PaginationModule } from '../pagination/pagination.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, PaginationModule.forRoot(), FormsModule],
  exports: [
      DatagridComponent,
  ],
  declarations: [
    DatagridComponent,
  ],
  providers: []
})
export class DatagridModule {}
