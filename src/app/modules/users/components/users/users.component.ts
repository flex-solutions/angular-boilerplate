import { Component, OnInit, PipeTransform, Pipe, } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { User } from '../../../../shared/models/user.model';
import { UserService } from '../../services/user.service';
import { ExDialog } from '../../../../shared/ui-common/modal/services/ex-dialog.service';
import { NotificationService } from '../../../../shared/services/notification.service';
import { TranslateService } from '../../../../shared/services/translate.service';
import { IFilterChangedEvent } from '../../../../shared/ui-common/datagrid/components/datagrid.component';
import { UserNavigationRoute, UserMessages } from '../../users.constant';

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
    this.loadData();
  }

  public count = (searchKey: string): Observable<number> => {
    return of(10);
  }

  loadData() {
    this.userService.getAllUser().subscribe(users => this.items = users);
  }

  onPageChanged(eventArg: IFilterChangedEvent) {
    console.log(eventArg);
  }

  async deleteUser(user: User) {
    await this.userService.remove(user);

    this.loadData();
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
