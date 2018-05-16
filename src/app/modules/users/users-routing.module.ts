import { CreateUserComponent } from './create-user/create-user.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { EditUserComponent } from './edit-user/edit-user.component';

const userRoutes: Routes = [
  {
    path: 'users',
    component: CreateUserComponent,
    data: {
      breadcrumb: 'Users'
    }
  },
  {
    path: 'users/create',
    component: CreateUserComponent,
    data: {
      breadcrumb: 'Create User'
    }
  },
  {
    path: 'users/update',
    component: EditUserComponent,
    data: {
      breadcrumb: 'Edit User'
    }
  },
  {
    path: 'users/user-detail',
    component: UserDetailComponent,
    data: {
      breadcrumb: 'View User Detail'
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(userRoutes)],
  exports: [RouterModule]
})
export class UsersRoutingModule {}
