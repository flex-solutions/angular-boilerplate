import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PermissionSchemeRoutingModule } from './permission-scheme-routing.module';
import { CreatePermissionSchemeComponent } from './create-permission-scheme/create-permission-scheme.component';
import { EditPermissionSchemeComponent } from './edit-permission-scheme/edit-permission-scheme.component';

@NgModule({
  imports: [
    CommonModule,
    PermissionSchemeRoutingModule
  ],
  declarations: [CreatePermissionSchemeComponent, EditPermissionSchemeComponent]
})
export class PermissionSchemeModule { }
