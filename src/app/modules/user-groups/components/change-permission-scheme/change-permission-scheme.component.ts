import { ExDialog } from './../../../../shared/ui-common/modal/services/ex-dialog.service';
import { UserGroupService } from './../../services/usergroup.service';
import { UserGroup } from './../../../../shared/models/user-group.model';
import { Component, OnInit } from '@angular/core';
import { DialogComponent, ModalSize } from '../../../../shared/ui-common/modal/components/dialog.component';
import { DialogService } from '../../../../shared/ui-common/modal/services/dialog.service';
import { PermissionSchemeDetailComponent } from '../../../permission-scheme/components/scheme-detail/permission-scheme-detail.component';

@Component({
    selector: 'app-change-permision-scheme-dlg',
    templateUrl: 'change-permission-scheme.component.html'
})

export class ChangePermissionSchemeComponent extends DialogComponent implements OnInit {

    userGroup: UserGroup = new UserGroup();
    selectedSchemeId: string;
    schemes: any[] = [];

    constructor(protected dialogService: DialogService,
        private usergroupService: UserGroupService,
        private dialog: ExDialog) {
        super(dialogService);
    }

    ngOnInit() {
        this.userGroup = this.callerData as UserGroup;
        this.selectedSchemeId = this.userGroup.permissionScheme._id;
        this.getPermissionSchemes();
    }

    cancel() {
        this.result = false;
        this.dialogResult();
    }

    submit() {
        if (this.selectedSchemeId === this.userGroup.permissionScheme._id) {
            this.cancel();
        } else {
            this.usergroupService.updatePermissionSchemeForUserGroup(this.userGroup._id, this.selectedSchemeId).subscribe(() => {
                this.result = true;
                this.dialogResult();
            });
        }
    }

    onValueChanged(value) {
        this.selectedSchemeId = value;
    }

    viewPermissionDetail(scheme) {
        this.dialog.openPrime(PermissionSchemeDetailComponent,
            {callerData: scheme}, ModalSize.Large);
    }

    private getPermissionSchemes() {
        this.usergroupService.getPermissionScheme().subscribe(schemes => {
            this.schemes = schemes;
        });
    }
}
