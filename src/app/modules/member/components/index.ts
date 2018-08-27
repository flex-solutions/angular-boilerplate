import { MembershipTypeDeleteConfirmationComponent } from './membership-type/delete-confirmation/delete-confirmation.component';
import { MembershipTypeCreateEditComponent } from './membership-type/create-edit/membership-type-create-edit.component';
import { CreateEditMemberComponent } from './create-edit-member/create-edit-member.component';
import { MemberHomeComponent } from './home/home.component';
import { MemberFilterComponent } from './member-filter/member-filter.component';
import { MembershipTypeHomeComponent } from './membership-type/membership-type.component';
import { AssignScheduleOptionComponent } from './membership-type/assign-schedule-option/assign-schedule-option.component';

export const memberComponents = [
    MemberHomeComponent,
    MemberFilterComponent,
    CreateEditMemberComponent,
    MembershipTypeHomeComponent,
    MembershipTypeCreateEditComponent,
    MembershipTypeDeleteConfirmationComponent,
    AssignScheduleOptionComponent
];

export const memberEntryComponents = [
    MembershipTypeDeleteConfirmationComponent,
    AssignScheduleOptionComponent
];
