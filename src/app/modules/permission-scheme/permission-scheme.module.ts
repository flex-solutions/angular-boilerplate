import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PermissionSchemeRoutingModule } from './permission-scheme-routing.module';
import { CreatePermissionSchemeComponent } from './create-permission-scheme/create-permission-scheme.component';
import { EditPermissionSchemeComponent } from './edit-permission-scheme/edit-permission-scheme.component';
import { PermissionSchemeServcie } from './services/permission-scheme.service';
import { ControllerFilterPipe, PermissionFilterPipe } from './pipes/permission-scheme.pipe';
import { PermissionSchemesComponent } from './permission-schemes/permission-schemes.component';
import { UICommonModule } from '../../shared/ui-common/ui-common.module';

@NgModule({
  imports: [
    CommonModule,
    PermissionSchemeRoutingModule,
    FormsModule,
    UICommonModule
  ],
  declarations: [CreatePermissionSchemeComponent, EditPermissionSchemeComponent,
    ControllerFilterPipe, PermissionFilterPipe, PermissionSchemesComponent],
  providers: [PermissionSchemeServcie]
})
export class PermissionSchemeModule { }
