import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRoutingModule } from './users-routing.module';
import { CreateUserComponent } from './create-user/create-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserDetailComponent } from './user-detail/user-detail.component';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    UsersRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [CreateUserComponent, UserDetailComponent]
})
export class UsersModule { }
