import { TranslateService } from './../../../../shared/services/translate.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../../../../shared/models/user.model';
import { UserService } from '../../services/user.service';
import { IFilterChangedEvent } from '../../../../shared/ui-common/datagrid/components/datagrid.component';
import { UserNavigationRoute } from '../../users.constant';
import ArrayExtension from '../../../../utilities/array.extension';
import { GroupUserModalComponent } from '../group-user/group-user-modal';
import { ExDialog } from '../../../../shared/ui-common/modal/services/ex-dialog.service';
import { TransferGroupData } from '../../../../shared/models/transfer-group-data.model';
import { Permission } from '../../../../shared/guards/decorator';
import { AbstractBaseComponent } from '../../../../shared/abstract/abstract-base-component';

@Component({
  moduleId: module.id,
  selector: 'app-users',
  templateUrl: './users.component.html'
})

@Permission({
  module: 'User Management'
})
export class UsersComponent extends AbstractBaseComponent implements OnInit {
  public items: User[] = [];
  private transferData = new TransferGroupData();
  groupName: string;
  subTitle: string;

  constructor(
    private exDialog: ExDialog,
    private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private translateService: TranslateService
  ) {
    super();
    this.groupName = this.activatedRoute.snapshot.params['groupName'];
  }

  public count = (searchKey: string): Observable<number> => {
    if (this.groupName) {
      return this.userService.countUsersByGroupName(this.groupName, searchKey);
    } else {
      return this.userService.count(searchKey);
    }
  }

  ngOnInit() {
    if (this.groupName) {
      this.subTitle = this.translateService.translateWithParams('users-list-by-group', this.groupName);
    }
  }

  private loadData(eventArg: IFilterChangedEvent) {
    if (this.groupName) {
      this.userService
      .getUsersByGroupName(this.groupName,
        eventArg.pagination.itemsPerPage,
        eventArg.pagination.page,
        eventArg.searchKey
      )
      .subscribe(users => (this.items = users));
    } else {
      this.userService
      .getUsers(
        eventArg.pagination.itemsPerPage,
        eventArg.pagination.page,
        eventArg.searchKey
      )
      .subscribe(users => (this.items = users));
    }
  }

  onPageChanged(eventArg: IFilterChangedEvent) {
    this.transferData.filterEvent = eventArg;
    this.loadData(eventArg);
  }

  async deleteUser(user: User) {
    // Call service to delete user
    await this.userService.remove(user);
    // Remove user in user list
    ArrayExtension.removeItemFromArray(this.items, user);
  }

  // Handle to change group of user.
  changeUserGroup(user: User) {
    this.transferData.user = user;
    this.exDialog
      .openPrime(GroupUserModalComponent, {
        callerData: this.transferData
      })
      .subscribe(t => {
        if (t) {
          this.loadData(this.transferData.filterEvent);
        }
      });
  }

  navigateToCreatePage() {
    this.router.navigate([UserNavigationRoute.CREATE_PAGE]);
  }

  navigateToEditPage(user: User) {
    this.router.navigate([UserNavigationRoute.EDIT_USER_PAGE, user._id]);
  }

  navigateToUserDetailPage(user: User) {
    this.router.navigate([UserNavigationRoute.USER_DETAIL_PAGE, user._id]);
  }

  navigateToGroup(userGroup: string) {
    this.router.navigate([
      `${UserNavigationRoute.GROUPS_PAGE}/filter`,
      userGroup
    ]);
  }

  viewAllUser() {
    this.router.navigate([UserNavigationRoute.USERS_PAGE]);
  }
}
