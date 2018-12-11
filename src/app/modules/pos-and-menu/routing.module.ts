import { POSEditComponent } from './components/edit/component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { POSComponent } from './components/list/list.component';
import { MenuDetailComponent } from './components/detail/menu-detail.component';
import { EditMenuItemComponent } from './components/edit/menu-item.component';

const routes: Routes = [
    {
      path: '',
      component: POSComponent,
      data: {
        breadcrumb: 'SNOB Point Of Sales'
      }
    },
    {
      path: 'update/:id',
      component: POSEditComponent,
      data: {
        breadcrumb: 'Update POS'
      }
    },
    {
      path: 'menu-items/update/:id',
      component: EditMenuItemComponent,
      data: {
        breadcrumb: 'Update POS'
      }
    },
    {
      path: 'detail/:id',
      component: MenuDetailComponent,
      data: {
        breadcrumb: 'Menu Detail'
      }
    },
    {
      path: 'detail',
      component: MenuDetailComponent,
      data: {
        breadcrumb: 'Menu Detail'
      }
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PosAndMenuRoutingModule {}
