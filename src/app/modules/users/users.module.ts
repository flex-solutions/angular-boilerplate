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
import { UsersComponent, UserFilterPipe } from './components/users/users.component';
import { GroupUserModalComponent, GroupFilterPipe } from './components/group-user/group-user-modal';

@NgModule({
  imports: [CommonModule, UsersRoutingModule, FormsModule, ReactiveFormsModule, UICommonModule],
  declarations: [CreateUserComponent, UserDetailComponent, EditUserComponent, UsersComponent, GroupUserModalComponent,
    UserFilterPipe, GroupFilterPipe],
  providers: [UserService]
})
export class UsersModule { }
