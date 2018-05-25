import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatagridDemoRoutingModule } from './datagrid-demo-routing.module';
import { DatagridDemoComponent, FilterPipe } from './demo/datagrid-demo.component';
import { UICommonModule } from '../../shared/ui-common/ui-common.module';

@NgModule({
  imports: [CommonModule, DatagridDemoRoutingModule, UICommonModule],
  declarations: [DatagridDemoComponent, FilterPipe],
  providers: []
})
export class DatagridDemoModule {}
