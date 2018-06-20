import { CustomerHomeComponent } from './components/home.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

const customerModuleRoutes: Routes = [
    {
      // TODO: update after finish create news
      path: '',
      component: CustomerHomeComponent,
      data: {
        breadcrumb: 'Customers'
      }
    }
  ];

  @NgModule({
    imports: [RouterModule.forChild(customerModuleRoutes)],
    exports: [RouterModule]
  })
  export class CustomerRoutingModule {}
