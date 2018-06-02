import { ActivatedRoute, Params } from '@angular/router';
import { UserGroupService } from './../../services/usergroup.service';
import { Component, OnInit } from '@angular/core';
import { IFilterChangedEvent } from '../../../../shared/ui-common/datagrid/components/datagrid.component';
import { IUserModel } from '../../model';
import { SelectAndAddedModel } from '../../../../shared/models/selectable.model';
import { isEmpty, forEach, find, propEq, filter, remove, equal } from 'ramda';
import ArrayExtension from '../../../../utilities/array.extension';

@Component({
    selector: 'app-edit-members',
    templateUrl: 'edit-members.component.html'
})

export class EditMembersComponent implements OnInit {

    ugId: string;
    currentPaging: IFilterChangedEvent;
    users: SelectAndAddedModel<IUserModel>[] = [];
    selectedUsers: IUserModel[] = [];

    constructor(private ugService: UserGroupService,
        private activatedRoute: ActivatedRoute) {
        activatedRoute.params.subscribe(((params: Params) => {
            this.ugId = params['id'];
        }));
    }

    ngOnInit() {
    }

    onPageChanged(eventArg: IFilterChangedEvent) {
        this.currentPaging = eventArg;
        this.getUserList();
    }

    getUserList() {
        if (!this.ugId) {
            return;
        }
        console.log('getUserList');
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
    }

    removeUser(user: IUserModel) {
        ArrayExtension.removeItemFromArray(this.selectedUsers, user);
        const selectableModel  = ArrayExtension.getItem(this.users, u => u.model.username === user.username);
        if (selectableModel) {
            selectableModel.isAdded = false;
        }
    }
}
