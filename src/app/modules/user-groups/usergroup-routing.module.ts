
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserGroupHomeComponent } from './home/user-group-home.component';
import { CreateEditUserGroupComponent } from './components/create-user-group/create-user-group.component';

const userGroupRoutes: Routes = [
  {
    path: '',
    component: UserGroupHomeComponent,
    data: {
      breadcrumb: 'User Groups'
    },
    children: [
    ]
  },
  {
    path: 'create',
    component: CreateEditUserGroupComponent,
    data: {
      breadcrumb: 'Create User Group'
    }
  },
  {
    path: 'update/:id',
    component: CreateEditUserGroupComponent,
    data: {
      breadcrumb: 'Update User Group'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(userGroupRoutes)],
  exports: [RouterModule]
})
export class UserGroupsRoutingModule {}
