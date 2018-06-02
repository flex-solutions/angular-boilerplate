import { UserGroupListFilterPipe, UserGroupPermissionSchemeListFilterPipe, UserListForBulkEditFilter } from './usergroup.pipe';


export const UserGroupPipes = [UserGroupListFilterPipe,
    UserGroupPermissionSchemeListFilterPipe,
    UserListForBulkEditFilter];
