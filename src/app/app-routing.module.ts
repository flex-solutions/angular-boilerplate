import { NgModule } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MenuComponent } from './menu/menu.component';

export const userModule = 'app/modules/users/users.module#UsersModule';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    data: {
      breadcrumb: 'Dashboard'
    }
  },
  {
    path: 'menu',
    component: MenuComponent,
    data: {
      breadcrumb: 'Menu'
    }
  },
  {
    path: 'users',
    loadChildren: userModule,
    data: {
      breadcrumb: 'Users'
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
