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
import { DatagridModule } from '../../shared/ui-common/datagrid/datagrid.module';
import { UICommonModule } from '../../shared/ui-common/ui-common.module';
import { FilterPipe } from '../datagrid-demo/demo/datagrid-demo.component';

@NgModule({
  imports: [CommonModule, UsersRoutingModule, FormsModule, ReactiveFormsModule, UICommonModule],
  declarations: [CreateUserComponent, UserDetailComponent, EditUserComponent, UsersComponent, FilterPipe, GroupUserModalComponent],
  providers: [UserService, UsersService],
  entryComponents: [GroupUserModalComponent]
})
export class UsersModule { }
