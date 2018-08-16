import { DialogComponent } from '../../../../../shared/ui-common/modal/components/dialog.component';
import { OnInit, Component } from '@angular/core';

@Component({
    selector: 'app-membership-type-delete-confirm',
    templateUrl: 'delete-confirmation.component.html'
})

export class MembershipTypeDeleteConfirmationComponent extends DialogComponent implements OnInit {
    ngOnInit(): void {
    }
    cancel() {
        this.result = false;
        this.dialogResult();
    }
    submit() {
        this.result = false;
        this.dialogResult();
    }
}
