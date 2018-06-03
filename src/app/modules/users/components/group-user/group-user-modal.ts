import { UserGroup } from './../../../../shared/models/user-group.model';
import { Component, OnInit, PipeTransform, Pipe, Input } from '@angular/core';
import { DialogComponent } from '../../../../shared/ui-common/modal/components/dialog.component';
import { DialogService } from '../../../../shared/ui-common/modal/services/dialog.service';
import { UserGroupService } from '../../../user-groups/services/usergroup.service';
import { TransferGroupData } from '../../../../shared/models/transfer-group-data.model';
import { Router } from '@angular/router';
import { UserNavigationRoute, UserMessages } from '../../users.constant';
import { UserService } from '../../services/user.service';
import { User } from '../../../../shared/models/user.model';
import { isNullOrUndefined } from 'util';
import { PagingDefault } from '../../../../shared/constants/const';

@Component({
  selector: 'app-group-user-modal',
  templateUrl: 'group-user-modal.html'
})

export class GroupUserModalComponent extends DialogComponent implements OnInit {
  constructor(protected dialogService: DialogService,
    private grService: UserGroupService,
    private userService: UserService,
    private router: Router) {
    super(dialogService);
  }
  groupInfo = new TransferGroupData();
  groupUsers: UserGroup[] = [];
  selectedGroupId: string;

  ngOnInit() {
    this.groupInfo = this.callerData as TransferGroupData;
    this.selectedGroupId = this.groupInfo.user.userGroup._id;
    this.getGroups();
  }

  onValueChanged(value) {
    this.selectedGroupId = value;
  }

  navigateToPermissionScheme(schemeId: string) {
    this.router.navigate([UserNavigationRoute.SCHEME_DETAIL_PAGE, schemeId]);
  }

  cancel() {
    this.result = false;
    this.dialogResult();
  }

  submit() {
    if (this.selectedGroupId !== this.groupInfo.user.userGroup._id) {
      let updateUser = new User();
      updateUser = this.groupInfo.user;
      updateUser.userGroup._id = this.selectedGroupId;
      this.userService.update(updateUser);
    } else {
      this.result = false;
    }
    this.dialogResult();
  }

  private getGroups() {
    let items = PagingDefault.ITEM_PER_PAGE;
    let page = PagingDefault.ITEM_PER_PAGE;
    if (!isNullOrUndefined(this.groupInfo.filterEvent)) {
      items = this.groupInfo.filterEvent.pagination.itemsPerPage;
      page = this.groupInfo.filterEvent.pagination.page;
    }
    this.grService.find(items, page)
      .subscribe(groups => this.groupUsers = groups);
  }

}
