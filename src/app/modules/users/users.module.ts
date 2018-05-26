import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRoutingModule } from './users-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserService } from './services/user.service';
import { UsersService } from './users-service';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { UsersComponent } from './users/users.component';

@NgModule({
  imports: [CommonModule, UsersRoutingModule, FormsModule, ReactiveFormsModule],
  declarations: [CreateUserComponent, UserDetailComponent, EditUserComponent, UsersComponent],
  providers: [UserService, UsersService]
})
export class UsersModule { }
