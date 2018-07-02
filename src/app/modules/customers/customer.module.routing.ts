import { CreateEditCustomerComponent } from './components/create-edit-customer/create-edit-customer.component';
import { CustomerHomeComponent } from './components/home/home.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

const customerModuleRoutes: Routes = [
    {
      path: '',
      component: CustomerHomeComponent,
      data: {
        breadcrumb: 'Customers'
      }
    },
    {
       path: 'create',
       component: CreateEditCustomerComponent,
       data: {
         breadcrumb: 'Create customers'
       }
    },
    {
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
