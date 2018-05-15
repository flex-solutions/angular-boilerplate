import { CreateUserComponent } from './create-user/create-user.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: CreateUserComponent,
    data: {
      breadcrumb: 'Users'
    }
  },
  {
    path: 'create',
    component: CreateUserComponent,
    data: {
      breadcrumb: 'Create User'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule {}
