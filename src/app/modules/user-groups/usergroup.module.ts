import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserGroupsRoutingModule } from './usergroup-routing.module';
import { UICommonModule } from '../../shared/ui-common/ui-common.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserGroupService } from './services/usergroup.service';
import { UserGroupPipes } from './pipes';
import { DialogModule } from '../../shared/ui-common/modal/dialog.module';
import { UserGroupModuleComponents, UserGroupModuleEntryComponents } from './components';

@NgModule({
  imports: [
    CommonModule,
    UICommonModule,
    UserGroupsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DialogModule
  ],
  declarations: [
    ...UserGroupPipes,
    ...UserGroupModuleComponents
  ],
  providers: [
    UserGroupService],
  entryComponents: [
    ...UserGroupModuleEntryComponents
  ]
})
export class UserGroupsModule { }
