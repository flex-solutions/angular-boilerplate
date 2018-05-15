import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { CreateUserComponent } from './create-user/create-user.component';
import { UserDetailComponent } from './user-detail/user-detail.component';

@NgModule({
  imports: [CommonModule, UsersRoutingModule],
  declarations: [CreateUserComponent, UserDetailComponent]
})
export class UsersModule { }
