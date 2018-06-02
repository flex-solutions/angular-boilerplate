import { NgModule } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { AuthGuard } from './shared/guards/auth-guard';
import { LoginComponent } from './modules/account/components/login/login.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'account',
    loadChildren: 'app/modules/account/account.module#AccountModule' // Lazy loading account module
  },
  {
    path: 'users',
    loadChildren: 'app/modules/users/users.module#UsersModule', // Lazy loading users module
  },
  {
    path: 'user-groups',
    loadChildren: 'app/modules/user-groups/usergroup.module#UserGroupsModule', // Lazy loading user groups module
  },
  {
    path: 'permission-schemes',
    loadChildren: 'app/modules/permission-scheme/permission-scheme.module#PermissionSchemeModule', // Lazy loading permission scheme module
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
