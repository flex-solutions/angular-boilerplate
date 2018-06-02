import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PermissionSchemeRoutingModule } from './permission-scheme-routing.module';
import { CreatePermissionSchemeComponent } from './create-permission-scheme/create-permission-scheme.component';
import { EditPermissionSchemeComponent } from './edit-permission-scheme/edit-permission-scheme.component';
import { PermissionSchemeServcie } from './services/permission-scheme.service';
import { ControllerFilterPipe, PermissionFilterPipe } from './pipes/permission-scheme.pipe';

@NgModule({
  imports: [
    CommonModule,
    PermissionSchemeRoutingModule,
    FormsModule,
  ],
  declarations: [CreatePermissionSchemeComponent, EditPermissionSchemeComponent, ControllerFilterPipe, PermissionFilterPipe],
  providers: [PermissionSchemeServcie]
})
export class PermissionSchemeModule { }
