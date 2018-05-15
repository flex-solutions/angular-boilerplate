import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { CreateUserComponent } from './create-user/create-user.component';

@NgModule({
  imports: [CommonModule, UsersRoutingModule],
  declarations: [CreateUserComponent]
})
export class UsersModule {}
