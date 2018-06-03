import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PermissionSchemesComponent } from './components/permission-schemes/permission-schemes.component';
import { CreatePermissionSchemeComponent } from './components/create-permission-scheme/create-permission-scheme.component';
import { EditPermissionSchemeComponent } from './components/edit-permission-scheme/edit-permission-scheme.component';

const routes: Routes = [
  {
    path: '',
    component: PermissionSchemesComponent,
    data: {
      breadcrumb: 'Permission Schemes'
    }
  },
  {
    path: 'create',
    component: CreatePermissionSchemeComponent,
    data: {
      breadcrumb: 'Create Permission Scheme'
    }
  },
  {
    path: 'edit/:id',
    component: EditPermissionSchemeComponent,
    data: {
      breadcrumb: 'Edit Permission Scheme'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PermissionSchemeRoutingModule { }
