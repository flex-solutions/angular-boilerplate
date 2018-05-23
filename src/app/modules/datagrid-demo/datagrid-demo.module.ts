import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatagridDemoRoutingModule } from './datagrid-demo-routing.module';
import { DatagridDemoComponent } from './demo/datagrid-demo.component';
import { UICommonModule } from '../../shared/ui-common/ui-common.module';

@NgModule({
  imports: [CommonModule, DatagridDemoRoutingModule, UICommonModule],
  declarations: [DatagridDemoComponent],
  providers: []
})
export class DatagridDemoModule {}
