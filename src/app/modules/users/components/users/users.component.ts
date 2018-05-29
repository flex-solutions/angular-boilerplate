import { Component, PipeTransform, Pipe, } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { User } from '../../../../shared/models/user.model';
import { UserService } from '../../services/user.service';
import { IFilterChangedEvent } from '../../../../shared/ui-common/datagrid/components/datagrid.component';
import { UserNavigationRoute, UserMessages } from '../../users.constant';
import ArrayExtension from '../../../../utilities/array.extension';

@Component({
  moduleId: module.id,
  selector: 'app-users',
  templateUrl: './users.component.html',
})
export class UsersComponent {

  public items: User[] = [];
  constructor(private userService: UserService, private router: Router) { }

  public count = (searchKey: string): Observable<number> => {
    return this.userService.count(searchKey);
  }

  private loadData(eventArg: IFilterChangedEvent) {
    this.userService.getUsers(eventArg.pagination.itemsPerPage, eventArg.pagination.itemsPerPage, eventArg.searchKey)
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


  navigateToChangeUserGroup(user: User) {
    this.router.navigate([UserNavigationRoute.EDIT_GROUP_PAGE, user.groupname]);
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
}
