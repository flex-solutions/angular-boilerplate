import { Component, OnInit, PipeTransform, Pipe, } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { userModuleNavigationRoute } from '../userModuleNavigationRoute';
import { ModalSize } from '../../shared/ui-common/modal/components/dialog.component';
import { ExDialog } from '../../shared/ui-common/modal/services/ex-dialog.service';
import { GroupUserModalComponent } from './component/group-user-modal';
import { Observable, of } from 'rxjs';
import { IFilterChangedEvent } from '../../shared/ui-common/datagrid/components/datagrid.component';
import { User } from '../../shared/models/user.model';
import { UserService } from './services/user.service';
import { NotificationService } from '../../shared/services/notification.service';
import { UserMessages } from './user.message';
import { TranslateService } from '../../shared/services/translate.service';

@Pipe({
  name: 'userFilter'
})
export class UserFilterPipe implements PipeTransform {
  transform(items: User[], searchText: string): any[] {
    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }
    searchText = searchText.toLowerCase();
    return items.filter(it => {
      return it.username.toLowerCase().includes(searchText)
        || it.fullname.toLowerCase().includes(searchText)
        || it.email.toLowerCase().includes(searchText);
    });
  }
}

@Component({
  moduleId: module.id,
  selector: 'app-users',
  templateUrl: './users.component.html',
})
export class UsersComponent implements OnInit {

  public items: User[] = [];
  constructor(private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private exDialog: ExDialog,
    private notifier: NotificationService,
    private translateService: TranslateService) { }

  ngOnInit(): void {
    this.userService.getAllUser().subscribe(users => this.items = users);
  }

  public count = (searchKey: string): Observable<number> => {
    return of(this.items.length);
  }

  onPageChanged(eventArg: IFilterChangedEvent) {
    console.log(eventArg);
  }

  getUserInfomation() { }

  showConfirm(user: User) {
    const msg = this.translateService.translate(
      UserMessages.DeleteUserMessage
    );
    this.exDialog.openConfirm(msg,
      'Confirm')
      .subscribe(result => {
        if (result) {
          this.userService.deleteUser(user).subscribe(() => { this.notifier.showSuccess('success'); });
        }
      });
  }

  navigateToChangeUserGroup(user: User) {
    this.router.navigate([userModuleNavigationRoute.EDIT_GROUP_PAGE, user.groupname]);
  }

  navigateToCreatePage() {
    this.router.navigate([userModuleNavigationRoute.CREATE_PAGE]);
  }

  navigateToEditPage(user: User) {
    this.router.navigate([userModuleNavigationRoute.EDIT_USER_PAGE, user.id]);
  }

  navigateToUserDetailPage(user: User) {
    this.router.navigate([userModuleNavigationRoute.USER_DETAIL_PAGE, user.id]);
  }
}
