import { CreatePermissionSchemeComponent } from './create-permission-scheme/create-permission-scheme.component';
import { EditPermissionSchemeComponent } from './edit-permission-scheme/edit-permission-scheme.component';
import { PermissionFilterPipe, ControllerFilterPipe } from '../pipes/permission-scheme.pipe';
import { CopySchemeComponent } from './copy-scheme/copy-scheme.component';
import { PermissionSchemesComponent } from './permission-schemes/permission-schemes.component';


export const PermissionSchemeModuleComponents = [
    CreatePermissionSchemeComponent,
    EditPermissionSchemeComponent,
    PermissionFilterPipe,
    PermissionSchemesComponent,
    CopySchemeComponent,
    ControllerFilterPipe
];

export const PermissionSchemeModuleEntryComponents = [
    CopySchemeComponent
];
