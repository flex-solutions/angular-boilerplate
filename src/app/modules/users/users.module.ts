import { UserModulePipes } from './pipes/pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRoutingModule } from './users-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from './services/user.service';
import { DatagridModule } from '../../shared/ui-common/datagrid/datagrid.module';
import { UICommonModule } from '../../shared/ui-common/ui-common.module';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { UsersComponent } from './components/users/users.component';
import { GroupUserModalComponent } from './components/group-user/group-user-modal';
import { BranchService } from './services/branch.service';
import { ChangePasswordComponent } from './components/change-password/change-password.modal';
import { userDirectives } from './directives';

@NgModule({
  imports: [CommonModule, UsersRoutingModule, FormsModule, ReactiveFormsModule, UICommonModule],
  declarations: [
    CreateUserComponent,
    UserDetailComponent,
    EditUserComponent,
    UsersComponent,
    GroupUserModalComponent,
    ChangePasswordComponent,
    ...UserModulePipes,
    ...userDirectives],
  providers: [UserService, BranchService],
  entryComponents: [GroupUserModalComponent]
})
export class UsersModule { }
