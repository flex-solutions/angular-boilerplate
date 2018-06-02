import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreatePermissionSchemeComponent } from './create-permission-scheme/create-permission-scheme.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PermissionSchemesComponent } from './permission-schemes/permission-schemes.component';

const routes: Routes = [
  {
    path: '',
    component: PermissionSchemesComponent,
    data: {
      breadcrumb: 'Permission Schemes'
    }
  },
  {
    path: 'permission-scheme',
    component: CreatePermissionSchemeComponent,
    data: {
      breadcrumb: 'aa'
    }
  },
  {
    path: 'permission-scheme/create',
    component: CreatePermissionSchemeComponent,
    data: {
      breadcrumb: 'cc'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PermissionSchemeRoutingModule { }
