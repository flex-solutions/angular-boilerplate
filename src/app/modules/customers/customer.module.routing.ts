import { MemberTypeCreateEditComponent } from './components/member-type/create-edit/member-type-create-edit.component';
import { MemberTypeHomeComponent } from './components/member-type/member-type.component';
import { CreateEditCustomerComponent } from './components/create-edit-customer/create-edit-customer.component';
import { CustomerHomeComponent } from './components/home/home.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { MemberTypeRoute } from './constants/customer.constants';

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
    {
      path: 'member-type',
      component: MemberTypeHomeComponent,
      data: {
        breadcrumb: 'Member types'
      }
    },
    {
      path: 'member-type/create',
      component: MemberTypeCreateEditComponent,
      data: {
        breadcrumb: 'New member type'
      }
   }
  ];

  @NgModule({
    imports: [RouterModule.forChild(customerModuleRoutes)],
    exports: [RouterModule]
  })
  export class CustomerRoutingModule {}
