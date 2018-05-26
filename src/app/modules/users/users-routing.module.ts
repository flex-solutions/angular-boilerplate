import { CreateUserComponent } from './components/create-user/create-user.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { UsersComponent } from './users/users.component';

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
    path: 'user-detail',
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
