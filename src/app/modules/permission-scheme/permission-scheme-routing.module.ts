import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreatePermissionSchemeComponent } from './create-permission-scheme/create-permission-scheme.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
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
