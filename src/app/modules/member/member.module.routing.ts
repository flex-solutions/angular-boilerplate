import {
  MembershipTypeCreateEditComponent
} from './components/membership-type/create-edit/membership-type-create-edit.component';
import {
  MembershipTypeHomeComponent
} from './components/membership-type/membership-type.component';
import {
  CreateEditMemberComponent
} from './components/create-edit-member/create-edit-member.component';
import {
  MemberHomeComponent
} from './components/home/home.component';
import {
  Routes,
  RouterModule
} from '@angular/router';
import {
  NgModule
} from '@angular/core';

const memberModuleRoutes: Routes = [{
    path: '',
    component: MemberHomeComponent,
    data: {
      breadcrumb: 'Members'
    }
  },
  {
    path: 'create',
    component: CreateEditMemberComponent,
    data: {
      breadcrumb: 'Create members'
    }
  },
  {
    path: 'update/:id',
    component: CreateEditMemberComponent,
    data: {
      breadcrumb: 'Edit members'
    }
  },
  {
    path: 'membership-type',
    component: MembershipTypeHomeComponent,
    data: {
      breadcrumb: 'Member types'
    }
  },
  {
    path: 'membership-type/create',
    component: MembershipTypeCreateEditComponent,
    data: {
      breadcrumb: 'New member type'
    }
  },
  {
    path: 'membership-type/update/:id',
    component: MembershipTypeCreateEditComponent,
    data: {
      breadcrumb: 'Edit member type'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(memberModuleRoutes)],
  exports: [RouterModule]
})
export class MemberRoutingModule {}
