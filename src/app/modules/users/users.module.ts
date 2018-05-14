import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRoutingModule } from './users-routing.module';
import { CreateUserComponent } from './create-user/create-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, UsersRoutingModule, FormsModule, ReactiveFormsModule],
  declarations: [CreateUserComponent]
})
export class UsersModule {}
