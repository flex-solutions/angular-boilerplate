import { CreateUserComponent } from './components/create-user/create-user.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { UsersComponent } from './users/users.component';
import { USER_CONFIGURATION } from './user.configuration';

const userRoutes: Routes = [
  {
    path: USER_CONFIGURATION.ROUTES.USERS,
    component: UsersComponent,
    data: {
      breadcrumb: 'Users'
    }
  },
  {
    path: USER_CONFIGURATION.ROUTES.CREATE_USER,
    component: CreateUserComponent,
    data: {
      breadcrumb: 'Create User'
    }
  },
  {
    path: USER_CONFIGURATION.ROUTES.EDIT_USER,
    component: EditUserComponent,
    data: {
      breadcrumb: 'Edit User'
    }
  },
  {
    path: USER_CONFIGURATION.ROUTES.DETAIL_USER,
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
export class UsersRoutingModule { }
