import { NgModule } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { UserGroupHomeComponent } from './modules/user-groups/home/user-group-home.component';

const routes: Routes = [
  {
    path: 'account',
    loadChildren: 'app/modules/account/account.module#AccountModule' // Lazy loading account module
  },
  {
    path: 'users',
    loadChildren: 'app/modules/users/users.module#UsersModule' // Lazy loading users module
  },
  {
    path: 'user-groups',
    // component: UserGroupHomeComponent
    loadChildren: 'app/modules/user-groups/usergroup.module#UserGroupsModule' // Lazy loading user groups module
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
