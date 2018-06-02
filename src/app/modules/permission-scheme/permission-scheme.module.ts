import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PermissionSchemeRoutingModule } from './permission-scheme-routing.module';
import { PermissionSchemeServcie } from './services/permission-scheme.service';
import { UICommonModule } from '../../shared/ui-common/ui-common.module';
import { PermissionSchemeModuleComponents, PermissionSchemeModuleEntryComponents } from './components';

@NgModule({
  imports: [
    CommonModule,
    PermissionSchemeRoutingModule,
    FormsModule, ReactiveFormsModule,
    UICommonModule
  ],
  declarations: [...PermissionSchemeModuleComponents],
  providers: [PermissionSchemeServcie],
  entryComponents: [...PermissionSchemeModuleEntryComponents]

})
export class PermissionSchemeModule { }
