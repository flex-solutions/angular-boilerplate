import { NgModule } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { UserGroupHomeComponent } from './modules/user-groups/home/user-group-home.component';
import { AuthGuard } from './shared/guards/auth-guard';

const routes: Routes = [
  {
    path: 'account',
    loadChildren: 'app/modules/account/account.module#AccountModule' // Lazy loading account module
  },
  {
    path: 'users',
    loadChildren: 'app/modules/users/users.module#UsersModule', // Lazy loading users module
    canActivate: [AuthGuard]
  },
  {
    path: 'user-groups',
    // component: UserGroupHomeComponent
    loadChildren: 'app/modules/user-groups/usergroup.module#UserGroupsModule', // Lazy loading user groups module
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
