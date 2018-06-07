import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PermissionSchemeRoutingModule } from './permission-scheme-routing.module';
import { PermissionSchemeServcie } from './services/permission-scheme.service';
import { UICommonModule } from '../../shared/ui-common/ui-common.module';
import { PermissionSchemeModuleComponents, PermissionSchemeModuleEntryComponents, PermissionSchemeExport } from './components';
import { PermissionSchemeDirectives } from './directives';
import { PermissionSchemePipes } from './pipes/permission-scheme.pipe';

@NgModule({
  imports: [
    CommonModule,
    PermissionSchemeRoutingModule,
    FormsModule, ReactiveFormsModule,
    UICommonModule
  ],
  declarations: [
    ...PermissionSchemeModuleComponents,
    ...PermissionSchemeDirectives,
    ...PermissionSchemePipes
  ],
  providers: [PermissionSchemeServcie],
  entryComponents: [...PermissionSchemeModuleEntryComponents],
  exports: [...PermissionSchemeExport]

})
export class PermissionSchemeModule { }
