import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRoutingModule } from './users-routing.module';
import { CreateUserComponent } from './create-user/create-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { UserService } from './services/user.service';
import { UsersComponent } from './users.component';
import { UsersService } from './users-service';
import { MdModule } from '../../md/md.module';

@NgModule({
  imports: [CommonModule, UsersRoutingModule, FormsModule, ReactiveFormsModule, MdModule],
  declarations: [CreateUserComponent, UserDetailComponent, EditUserComponent, UsersComponent],
  providers: [UserService, UsersService]
})
export class UsersModule { }
