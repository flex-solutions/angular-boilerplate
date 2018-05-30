import { UserGroupService } from './../../services/usergroup.service';
import { UserGroup } from './../../../../shared/models/user-group.model';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { DialogComponent } from '../../../../shared/ui-common/modal/components/dialog.component';
import { DialogService } from '../../../../shared/ui-common/modal/services/dialog.service';

@Component({
    selector: 'app-change-permision-scheme-dlg',
    templateUrl: 'change-permission-scheme.component.html',
    styleUrls: ['change-permission-scheme.component.css']
})

export class ChangePermissionSchemeComponent extends DialogComponent implements OnInit, AfterViewInit {

    userGroup: UserGroup = new UserGroup();
    schemes: any[] = [];

    constructor(protected dialogService: DialogService,
        private usergroupService: UserGroupService) {
        super(dialogService);
    }

    ngOnInit() {
        this.userGroup = this.callerData as UserGroup;
    }

    ngAfterViewInit() {
        this.getPermissionSchemes();
    }

    cancel() {
        this.result = false;
        this.dialogResult();
    }

    submit() {
        this.result = true;
        this.dialogResult();
    }

    onValueChanged(value) {
        console.log(value);
    }

    private getPermissionSchemes() {
        this.usergroupService.getPermissionScheme().subscribe(schemes => {
            this.schemes = schemes;
        });
    }
}
