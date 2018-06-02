import { ChangePermissionSchemeComponent } from './change-permission-scheme/change-permission-scheme.component';
import { UserGroupHomeComponent } from '../home/user-group-home.component';
import { CreateEditUserGroupComponent } from './create-user-group/create-user-group.component';
import { EditMembersComponent } from './edit-members/edit-members.component';

export const UserGroupModuleComponents = [
    CreateEditUserGroupComponent,
    UserGroupHomeComponent,
    ChangePermissionSchemeComponent,
    EditMembersComponent
];

export const UserGroupModuleEntryComponents = [
    ChangePermissionSchemeComponent
];
