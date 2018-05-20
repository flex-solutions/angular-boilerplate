import { NgModule } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { CreateUserComponent } from './modules/users/create-user/create-user.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
