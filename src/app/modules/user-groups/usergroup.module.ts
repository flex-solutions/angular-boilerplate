import { ChangePermissionSchemeComponent } from './components/change-permission-scheme/change-permission-scheme.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserGroupsRoutingModule } from './usergroup-routing.module';
import { UICommonModule } from '../../shared/ui-common/ui-common.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserGroupService } from './services/usergroup.service';
import { UserGroupHomeComponent } from './home/user-group-home.component';
import { CreateEditUserGroupComponent } from './components/create-user-group/create-user-group.component';
import { UserGroupPipes } from './pipes';

@NgModule({
  imports: [
    CommonModule,
    UICommonModule,
    UserGroupsRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    ...UserGroupPipes,
    CreateEditUserGroupComponent,
    UserGroupHomeComponent,
    ChangePermissionSchemeComponent],
  providers: [
    UserGroupService],
  entryComponents: [
    ChangePermissionSchemeComponent
  ]
})
export class UserGroupsModule { }
