import { CreateEditCustomerComponent } from './components/create-edit-customer/create-edit-customer.component';
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
    },
    {
       // TODO: update after finish create news
       path: 'create',
       component: CreateEditCustomerComponent,
       data: {
         breadcrumb: 'Create customers'
       }
    },
    {
      // TODO: update after finish create news
      path: 'update/:id',
      component: CreateEditCustomerComponent,
      data: {
        breadcrumb: 'Edit customers'
      }
   },
  ];

  @NgModule({
    imports: [RouterModule.forChild(customerModuleRoutes)],
    exports: [RouterModule]
  })
  export class CustomerRoutingModule {}
