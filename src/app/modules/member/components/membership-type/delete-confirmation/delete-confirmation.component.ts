import { DialogService } from './../../../../../shared/ui-common/modal/services/dialog.service';
import { MembershipTypeService } from './../../../services/membership-type.service';
import { MembershipType } from './../../../../../shared/models/membership-type.model';
import { DialogComponent } from '../../../../../shared/ui-common/modal/components/dialog.component';
import { OnInit, Component } from '@angular/core';
import { filter, eq, isEmpty } from 'lodash';

@Component({
    selector: 'app-membership-type-delete-confirm',
    templateUrl: 'delete-confirmation.component.html'
})

export class MembershipTypeDeleteConfirmationComponent extends DialogComponent implements OnInit {
    deletingMembershipType: MembershipType;
    membershipTypes: MembershipType[] = [];
    newMembershipType: MembershipType;

    constructor(protected dialogService: DialogService,
        private membershipTypeService: MembershipTypeService) {
        super(dialogService);
    }

    ngOnInit(): void {
        this.deletingMembershipType = <MembershipType>this.callerData;
        this.membershipTypeService.getMembershipTypes().subscribe(types => {
            this.membershipTypes = filter(types, type => !eq(type._id, this.deletingMembershipType._id));
            if (!isEmpty(this.membershipTypes)) {
                this.newMembershipType = this.membershipTypes[0];
            }
        });
    }

    cancel() {
        this.result = false;
        this.dialogResult();
    }

    submit() {
        if (!isEmpty(this.newMembershipType) && !isEmpty(this.deletingMembershipType)) {
            this.membershipTypeService.deleteMembershipType(this.deletingMembershipType._id, this.newMembershipType._id).subscribe(() => {
                this.result = true;
                this.dialogResult();
            });
        }
    }
}
