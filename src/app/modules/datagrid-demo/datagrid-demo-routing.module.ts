import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DatagridDemoComponent } from './demo/datagrid-demo.component';

const routes: Routes = [
  {
    path: 'datagrid-demo',
    component: DatagridDemoComponent,
    data: {
      breadcrumb: 'Datagrid Demo'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DatagridDemoRoutingModule {}
