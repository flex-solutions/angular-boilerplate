import { ChangePermissionSchemeComponent } from './../components/change-permission-scheme/change-permission-scheme.component';
import { UserGroup } from './../../../shared/models/user-group.model';
import { IFilterChangedEvent } from './../../../shared/ui-common/datagrid/components/datagrid.component';
import { Observable } from 'rxjs';
import { UserGroupService } from './../services/usergroup.service';
import { OnInit, Component, ViewChild } from '@angular/core';
import { AbstractFormComponent } from '../../../shared/abstract/abstract-form-component';
import { Router, ActivatedRoute } from '@angular/router';
import { RouteNames } from '../constants/user-groups.constant';
import { DefaultUserGroup } from '../../../shared/constants/const';
import { ExDialog } from '../../../shared/ui-common/modal/services/ex-dialog.service';
import { ModalSize } from '../../../shared/ui-common/modal/components/dialog.component';
import { DialogTitleConstant } from '../../../shared/constants/dialog-title.constant';
import { TranslateService } from '../../../shared/services/translate.service';
import { NotificationService } from '../../../shared/services/notification.service';
import { Errors } from '../errors/errors';

@Component({
  moduleId: module.id,
  selector: 'app-user-group-home',
  templateUrl: './user-group-home.component.html'
})
export class UserGroupHomeComponent implements OnInit {
  // @ViewChild('exampleModal-2')
  usergroups: UserGroup[] = [];
  messageContentTemplate = 'user_groups-user_groups_list-delete_user_group_action_message';
  selectedUserGroup: UserGroup;
  currentPaging: IFilterChangedEvent;
  usergroup: string;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private service: UserGroupService,
    private dialogManager: ExDialog,
    private notificationService: NotificationService,
    private translateService: TranslateService,
    private activatedRoute: ActivatedRoute
  ) {
     // Detect page is update mode
     this.usergroup = this.activatedRoute.snapshot.params['name'];
  }

  ngOnInit(): void {}

  public count = (searchKey: string): Observable<number> => {
    return this.service.count(searchKey);
  }

  onPageChanged(eventArg: IFilterChangedEvent) {
    this.currentPaging = eventArg;
    this.getUserGroups();
  }

  getUserGroups() {
    this.service.find(this.currentPaging.pagination.itemsPerPage,
      this.currentPaging.pagination.page,
      this.currentPaging.searchKey).subscribe(result => {
        this.usergroups = result;
      });
  }

  createNewUserGroup() {
    this.router.navigate([RouteNames.CREATE]);
  }

  editGroup(usergroup: UserGroup) {
    this.router.navigate([RouteNames.EDIT, usergroup._id]);
  }

  changePermissionScheme(usergroup) {
    this.dialogManager.openPrime(ChangePermissionSchemeComponent, { callerData: usergroup }).subscribe(result => {
      if (result) {
        this.getUserGroups();
      }
    });
  }

  canAction(usergroup: UserGroup) {
    return usergroup.name !== DefaultUserGroup.ADMINISTRATORS && usergroup.name !== DefaultUserGroup.USERS;
    }

  private buildMessageContent(value: string) {
    return this.getMessage(
      this.messageContentTemplate,
      value
    );
  }

  private getMessage(code: string, ...params) {
    if (params.length) {
      return this.translateService.translateWithParams(code, params);
    } else {
      return this.translateService.translate(code);
    }
  }

  deleteUserGroup(userGroup: UserGroup) {
    const content = this.buildMessageContent(userGroup.name);
    this.dialogManager
      .openConfirm(content, DialogTitleConstant.Confirmation, ModalSize.Normal)
      .subscribe(result => {
        if (result) {
          this.service.remove(userGroup._id).subscribe(success => {
            const msg = this.getMessage(
              Errors.Delete_User_Group_Success,
              userGroup.name
            );
            this.notificationService.showSuccess(msg);
            this.getUserGroups();
          });
        } else {
        }
      });
  }
}
