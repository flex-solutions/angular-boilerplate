import { ChangePermissionSchemeComponent } from './../components/change-permission-scheme/change-permission-scheme.component';
import { ExDialog } from './../../../shared/ui-common/modal/services/ex-dialog.service';
import { UserGroup } from './../../../shared/models/user-group.model';
import { IFilterChangedEvent } from './../../../shared/ui-common/datagrid/components/datagrid.component';
import { Observable } from 'rxjs';
import { UserGroupService } from './../services/usergroup.service';
import { OnInit, Component } from '@angular/core';
import { AbstractFormComponent } from '../../../shared/abstract/abstract-form-component';
import { Router, ActivatedRoute } from '@angular/router';
import { RouteNames } from '../constants/user-groups.constant';
import { DefaultUserGroup } from '../../../shared/constants/const';

@Component({
  moduleId: module.id,
  selector: 'app-user-group-home',
  templateUrl: './user-group-home.component.html',
})
export class UserGroupHomeComponent implements OnInit {

  usergroups: UserGroup[] = [];
  currentPaging: IFilterChangedEvent;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private service: UserGroupService,
    private dialogManager: ExDialog) {
  }

  ngOnInit(): void {
  }

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
}
