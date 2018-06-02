import { Location } from '@angular/common';
import { UserGroup } from './../../../../shared/models/user-group.model';
import { ActivatedRoute, Params } from '@angular/router';
import { UserGroupService } from './../../services/usergroup.service';
import { Component, OnInit } from '@angular/core';
import { IFilterChangedEvent } from '../../../../shared/ui-common/datagrid/components/datagrid.component';
import { IUserModel } from '../../model';
import { SelectAndAddedModel } from '../../../../shared/models/selectable.model';
import { isEmpty, forEach, find, propEq, filter, any } from 'ramda';
import ArrayExtension from '../../../../utilities/array.extension';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-edit-members',
    templateUrl: 'edit-members.component.html'
})

export class EditMembersComponent implements OnInit {

    ugId: string;
    currentPaging: IFilterChangedEvent;
    users: SelectAndAddedModel<IUserModel>[] = [];
    selectedUsers: IUserModel[] = [];
    usergroup: UserGroup = new UserGroup();
    selectedUserCount = 0;
    canAddMoreUser = true;

    public count = (searchKey: string): Observable<number> => {
        return this.ugService.countUserListExceptInGroup(this.ugId, this.currentPaging ? this.currentPaging.searchKey : undefined);
    }

    constructor(private ugService: UserGroupService,
        private activatedRoute: ActivatedRoute,
        private location: Location) {
        activatedRoute.params.subscribe(((params: Params) => {
            this.ugId = params['id'];
            this.getUserGroupInfo();
        }));
    }

    ngOnInit() {
    }

    onPageChanged(eventArg: IFilterChangedEvent) {
        this.currentPaging = eventArg;
        this.getUserList();
    }

    getUserGroupInfo() {
        this.ugService.getById(this.ugId).subscribe(ug => {
            this.usergroup = ug;
        });
    }

    getUserList() {
        if (!this.ugId) {
            return;
        }
        this.ugService.getUserListExceptInGroup(this.ugId,
            this.currentPaging.searchKey,
            this.currentPaging.pagination.itemsPerPage,
            this.currentPaging.pagination.page).subscribe(result => {
                this.users = [];
                if (isEmpty(result)) {
                    return;
                }

                forEach((u: IUserModel) => {
                    const selectedUser = find(propEq('username', u.username))(this.selectedUsers);
                    const model = new SelectAndAddedModel<IUserModel>();
                    if (selectedUser) {
                        model.isSelected = true;
                    }
                    model.model = u;

                    this.users.push(model);
                }, result);
            });
    }

    addToSelectedUsers() {
        const tempSelectedUsers = filter((u: SelectAndAddedModel<IUserModel>) => u.isSelected && !u.isAdded, this.users);
        forEach((u: SelectAndAddedModel<IUserModel>) => {
            u.isAdded = true;
            this.selectedUsers.push(u.model);
        }, tempSelectedUsers);
        this.updateSelectedUserCount();
        this.updateCanAddUser();
    }

    removeUser(user: IUserModel) {
        ArrayExtension.removeItemFromArray(this.selectedUsers, user);
        const selectableModel = ArrayExtension.getItem(this.users, u => u.model.username === user.username);
        if (selectableModel) {
            selectableModel.isAdded = false;
        }
        this.updateSelectedUserCount();
        this.updateCanAddUser();
    }

    updateSelectedUserCount() {
        this.selectedUserCount = this.selectedUsers.length;
    }

    updateCanAddUser() {
        this.canAddMoreUser = any((u: SelectAndAddedModel<IUserModel>) => u.isSelected && !u.isAdded, this.users);
    }

    cancel() {
        this.location.back();
    }
}
