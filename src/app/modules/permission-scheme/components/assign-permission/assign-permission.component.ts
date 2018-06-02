import { NotificationService } from './../../../../shared/services/notification.service';
import { TranslateService } from './../../../../shared/services/translate.service';
import { UserGroup } from './../../../../shared/models/user-group.model';
import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { IFilterChangedEvent } from '../../../../shared/ui-common/datagrid/components/datagrid.component';
import { SelectAndAddedModel } from '../../../../shared/models/selectable.model';
import { isEmpty, forEach, find, propEq, filter, any, map } from 'ramda';
import ArrayExtension from '../../../../utilities/array.extension';
import { Observable } from 'rxjs';
import { IPermissionScheme } from '../../../../shared/models/permission-scheme.model';
import { PermissionSchemeServcie } from '../../services/permission-scheme.service';
import { DialogComponent } from '../../../../shared/ui-common/modal/components/dialog.component';
import { DialogService } from '../../../../shared/ui-common/modal/services/dialog.service';

@Component({
    selector: 'app-assign-permission',
    templateUrl: 'assign-permission.component.html'
})

export class AssignPermissionComponent extends DialogComponent implements OnInit {

    searchKey: string;
    userGroups: SelectAndAddedModel<UserGroup>[] = [];
    selectedUserGroups: UserGroup[] = [];
    selectedUserGroupCountMsg: string;
    canAddMoreUserGroup = true;
    permissionScheme: IPermissionScheme;
    schemeDescription: string;

    constructor(
        private permissionSchemeService: PermissionSchemeServcie,
        private translateService: TranslateService,
        protected dialogService: DialogService,
        private notificationService: NotificationService) {
        super(dialogService);

    }

    ngOnInit() {
        // Clone permission scheme
        const selectScheme = {};
        Object.assign(selectScheme, this.callerData);
        this.permissionScheme = (selectScheme as IPermissionScheme);
        this.updateCanAddUserGroups();
        this.updateSelectedUserGroupsCount();
        this.schemeDescription = this.translateService.translateWithParams(
            'permission-scheme-assign-permission-label-assign_description', this.permissionScheme.name);

        this.getUserGroups();
    }

    get successMessage() {
        return this.translateService.translateWithParams(
            'permission-scheme-assign-permission-notification-assign_successful', this.permissionScheme.name);
    }

    getUserGroups() {
        this.permissionSchemeService.getAllUserGroups().subscribe(result => {
            this.userGroups = [];
            if (isEmpty(result)) {
                return;
            }
            forEach((u: UserGroup) => {
                const selectedItem = find(propEq('name', u.name))(this.selectedUserGroups);
                const model = new SelectAndAddedModel<UserGroup>();
                if (selectedItem) {
                    model.isSelected = true;
                }
                model.model = u;

                this.userGroups.push(model);
            }, result);
        });
    }

    addToSelectedUserGroups() {
        const tempSelectedUsers = filter((u: SelectAndAddedModel<UserGroup>) => u.isSelected && !u.isAdded, this.userGroups);
        forEach((u: SelectAndAddedModel<UserGroup>) => {
            u.isAdded = true;
            this.selectedUserGroups.push(u.model);
        }, tempSelectedUsers);
        this.updateSelectedUserGroupsCount();
        this.updateCanAddUserGroups();
    }

    removeUserGroups(user: UserGroup) {
        ArrayExtension.removeItemFromArray(this.selectedUserGroups, user);
        const selectableModel = ArrayExtension.getItem(this.userGroups, u => u.model.name === user.name);
        if (selectableModel) {
            selectableModel.isAdded = false;
            selectableModel.isSelected = false;
        }
        this.updateSelectedUserGroupsCount();
        this.updateCanAddUserGroups();
    }

    updateSelectedUserGroupsCount() {
        const count = this.selectedUserGroups ? this.selectedUserGroups.length : 0;
        this.selectedUserGroupCountMsg = this.translateService.translateWithParams(
            'permission-scheme-assign-permission-label-count_selected_group', count);
    }

    updateCanAddUserGroups() {
        this.canAddMoreUserGroup = any((u: SelectAndAddedModel<UserGroup>) => u.isSelected && !u.isAdded, this.userGroups);
    }

    cancel() {
        this.result = false;
        this.dialogResult();
    }

    submit() {
        if (isEmpty(this.selectedUserGroups)) {
            return;
        }
        const userGroupIds = map((u: UserGroup) => u._id, this.selectedUserGroups);

        this.permissionSchemeService.updateSchemeForUserGroup(this.permissionScheme._id, userGroupIds)
            .then(result => {
                this.result = true;
                this.dialogResult();
                this.notificationService.showSuccess(this.successMessage);
            });
    }

    submitFilter() {

    }
}
