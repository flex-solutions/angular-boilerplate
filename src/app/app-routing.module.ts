import { NgModule } from '@angular/core';
import { RouterModule, Routes, Router, Route } from '@angular/router';
import { HomeLayoutComponent } from './shared/layout/home-layout/home-layout.component';
import { AuthGuard } from './shared/guards/auth-guard';
import { LoginLayoutComponent } from './shared/layout/login-layout/login-layout.component';

const routes: Routes = [
  {
    path: '',
    component: HomeLayoutComponent,
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
    component: LoginLayoutComponent,
    children: [{
      path: 'authentication',
      loadChildren: 'app/modules/authentication/module#AuthenticationModule', // Lazy loading authentication module
    }]
  },
];

@NgModule({
  providers: [AuthGuard],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
