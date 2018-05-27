import { CreateUserComponent } from './components/create-user/create-user.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { UsersComponent } from './components/users/users.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';

const userRoutes: Routes = [
  {
    path: '',
    component: UsersComponent,
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
  },
  {
    path: 'edit/:id',
    component: EditUserComponent,
    data: {
      breadcrumb: 'Edit User'
    }
  },
  {
    path: 'user/:id',
    component: UserDetailComponent,
    data: {
      breadcrumb: 'View User Detail'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(userRoutes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
