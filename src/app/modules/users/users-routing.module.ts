import { CreateUserComponent } from './create-user/create-user.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserDetailComponent } from './user-detail/user-detail.component';

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
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule {}
