import { Component, PipeTransform, Pipe, } from '@angular/core';
import { Router } from '@angular/router';
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
import { UserGroupService } from '../../../user-groups/services/usergroup.service';
import { UserGroup } from '../../../../shared/models/user-group.model';

@Component({
  moduleId: module.id,
  selector: 'app-users',
  templateUrl: './users.component.html',
})
export class UsersComponent {

  public items: User[] = [];
  public groupUsers: UserGroup[] = [];
  constructor(private exDialog: ExDialog,
    private userService: UserService,
    private grService: UserGroupService,
    private router: Router) { }

  public count = (searchKey: string): Observable<number> => {
    return this.userService.count(searchKey);
  }

  private loadData(eventArg: IFilterChangedEvent) {
    this.userService.getUsers(eventArg.pagination.itemsPerPage, eventArg.pagination.page, eventArg.searchKey)
      .subscribe(users => this.items = users);
  }

  onPageChanged(eventArg: IFilterChangedEvent) {
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
    this.exDialog.openPrime(GroupUserModalComponent, { callerData: user }).subscribe(result => {
      //   if (result) {
      //     alert('you clicked Submit button');
      //   } else {
      //     alert('you clicked cancel button');
      //   }
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
    this.router.navigate([UserNavigationRoute.GROUPS_PAGE, userGroup]);
  }

  private getGroupUsers() {
    this.grService.find(100, 1).subscribe(gr => {
      if (gr) {
        this.groupUsers = gr;
      }
    });
  }
}
