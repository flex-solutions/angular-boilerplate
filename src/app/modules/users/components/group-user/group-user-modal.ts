import { UserGroup } from './../../../../shared/models/user-group.model';
import { Component, OnInit, PipeTransform, Pipe, Input } from '@angular/core';
import {
  DialogComponent,
  ModalSize
} from '../../../../shared/ui-common/modal/components/dialog.component';
import { DialogService } from '../../../../shared/ui-common/modal/services/dialog.service';
import { UserGroupService } from '../../../user-groups/services/usergroup.service';
import { TransferGroupData } from '../../../../shared/models/transfer-group-data.model';
import { Router } from '@angular/router';
import { UserNavigationRoute, UserMessages } from '../../users.constant';
import { UserService } from '../../services/user.service';
import { User } from '../../../../shared/models/user.model';
import { isNullOrUndefined } from 'util';
import { PagingDefault } from '../../../../shared/constants/const';
import { NotificationService } from '../../../../shared/services/notification.service';
import { TranslateService } from '../../../../shared/services/translate.service';
import { ExDialog } from '../../../../shared/ui-common/modal/services/ex-dialog.service';
import { PermissionSchemeDetailComponent } from '../../../permission-scheme/components/scheme-detail/permission-scheme-detail.component';

@Component({
  selector: 'app-group-user-modal',
  templateUrl: 'group-user-modal.html'
})
export class GroupUserModalComponent extends DialogComponent implements OnInit {
  constructor(
    protected dialogService: DialogService,
    private grService: UserGroupService,
    private userService: UserService,
    private readonly notificationService: NotificationService,
    private translateService: TranslateService,
    private router: Router,
    private dialogManager: ExDialog
  ) {
    super(dialogService);
  }
  groupInfo = new TransferGroupData();
  groupUsers: UserGroup[] = [];
  selectedGroup = new UserGroup();

  ngOnInit() {
    this.groupInfo = this.callerData as TransferGroupData;
    this.selectedGroup._id = this.groupInfo.user.userGroup._id;
    this.getGroups();
  }

  onValueChanged(userGroup: UserGroup) {
    this.selectedGroup = userGroup;
  }

  navigateToPermissionScheme(schemeId: string, schemeName: string) {
    this.dialogManager.openPrime(
      PermissionSchemeDetailComponent,
      { callerData: { _id: schemeId, name: schemeName } },
      ModalSize.Large
    );
  }

  cancel() {
    this.result = false;
    this.dialogResult();
  }

  submit() {
    if (this.selectedGroup._id !== this.groupInfo.user.userGroup._id) {
      let updateUser = new User();
      updateUser = this.groupInfo.user;
      updateUser.userGroup._id = this.selectedGroup._id;
      // * Save user successful, display success notification
      const msg = this.translateService.translateWithParams(
        UserMessages.ChangeGroupSuccess, updateUser.username, this.selectedGroup.name
      );
      this.userService.update(updateUser).subscribe(respond => {
        this.notificationService.showSuccess(msg);
        this.result = true;
        this.dialogResult();
      });
    } else {
      this.result = false;
      this.dialogResult();
    }
  }

  private getGroups() {
    let items = PagingDefault.ITEM_PER_PAGE;
    let page = PagingDefault.ITEM_PER_PAGE;
    if (!isNullOrUndefined(this.groupInfo.filterEvent)) {
      items = this.groupInfo.filterEvent.pagination.itemsPerPage;
      page = this.groupInfo.filterEvent.pagination.page;
    }
    this.grService
      .find(items, page)
      .subscribe(groups => (this.groupUsers = groups));
  }
}
