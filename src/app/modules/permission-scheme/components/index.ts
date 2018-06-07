import { CreatePermissionSchemeComponent } from './create-permission-scheme/create-permission-scheme.component';
import { EditPermissionSchemeComponent } from './edit-permission-scheme/edit-permission-scheme.component';
import { CopySchemeComponent } from './copy-scheme/copy-scheme.component';
import { PermissionSchemesComponent } from './permission-schemes/permission-schemes.component';
import { AssignPermissionComponent } from './assign-permission/assign-permission.component';
import { PermissionSchemeDetailComponent } from './scheme-detail/permission-scheme-detail.component';


export const PermissionSchemeModuleComponents = [
    CreatePermissionSchemeComponent,
    EditPermissionSchemeComponent,
    PermissionSchemesComponent,
    CopySchemeComponent,
    AssignPermissionComponent,
    PermissionSchemeDetailComponent
];

export const PermissionSchemeModuleEntryComponents = [
    CopySchemeComponent,
    AssignPermissionComponent,
    PermissionSchemeDetailComponent
];

export const PermissionSchemeExport = [
    PermissionSchemeDetailComponent
];
