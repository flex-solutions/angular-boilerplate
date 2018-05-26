import { NgModule } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';

const routes: Routes = [
  {
    path: 'account',
    loadChildren: 'app/modules/account/account.module#AccountModule' // Lazy loading account module
  },
  {
    path: 'users',
    loadChildren: 'app/modules/users/users.module#UsersModule' // Lazy loading users module
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
