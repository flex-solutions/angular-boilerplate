import { NgModule } from '@angular/core';
import { RouterModule, Routes, Router, Route } from '@angular/router';
import { HomeLayoutComponentComponent } from './shared/layout/home-layout-component/home-layout-component.component';
import { AuthGuard } from './shared/guards/auth-guard';
import { LoginLayoutComponentComponent } from './shared/layout/login-layout-component/login-layout-component.component';

const routes: Routes = [
  {
    path: '',
    component: HomeLayoutComponentComponent,
    canActivate: [AuthGuard],
    children: [{
      path: 'users',
      loadChildren: 'app/modules/users/users.module#UsersModule', // Lazy loading users module
    },
    {
      path: 'user-groups',
      loadChildren: 'app/modules/user-groups/usergroup.module#UserGroupsModule', // Lazy loading user groups module
    },
    {
      path: 'permission-schemes',
      loadChildren: 'app/modules/permission-scheme/permission-scheme.module#PermissionSchemeModule',
    }]
  },
  {
    path: '',
    component: LoginLayoutComponentComponent,
    children: [{
      path: 'account',
      loadChildren: 'app/modules/account/account.module#AccountModule', // Lazy loading account module
    }]
  }
];

@NgModule({
  providers: [AuthGuard],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
