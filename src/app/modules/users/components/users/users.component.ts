import { Component, PipeTransform, Pipe } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { User } from '../../../../shared/models/user.model';
import { UserService } from '../../services/user.service';
import { IFilterChangedEvent } from '../../../../shared/ui-common/datagrid/components/datagrid.component';
import { UserNavigationRoute, UserMessages } from '../../users.constant';
import ArrayExtension from '../../../../utilities/array.extension';
import { ModuleRoute } from '../../../../shared/constants/const';
import { GroupUserModalComponent } from '../group-user/group-user-modal';
import { ModalSize } from '../../../../shared/ui-common/modal/components/dialog.component';
import { ExDialog } from '../../../../shared/ui-common/modal/services/ex-dialog.service';
import { TransferGroupData } from '../../../../shared/models/transfer-group-data.model';

@Component({
  moduleId: module.id,
  selector: 'app-users',
  templateUrl: './users.component.html'
})
export class UsersComponent {
  public items: User[] = [];
  private transferData = new TransferGroupData();
  groupName: string;

  constructor(
    private exDialog: ExDialog,
    private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.groupName = this.activatedRoute.snapshot.params['groupName'];
  }

  public count = (searchKey: string): Observable<number> => {
    return this.userService.count(searchKey);
  }

  private loadData(eventArg: IFilterChangedEvent) {
    this.userService
      .getUsers(
        eventArg.pagination.itemsPerPage,
        eventArg.pagination.page,
        eventArg.searchKey
      )
      .subscribe(users => (this.items = users));
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
}
