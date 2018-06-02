import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { NavigationExtras, Router, ActivatedRoute } from '@angular/router';
import { User } from '../../../../shared/models/user.model';
import { UserService } from '../../services/user.service';
import { NotificationService } from '../../../../shared/services/notification.service';
import { UserNavigationRoute } from '../../users.constant';
import { TransferGroupData } from '../../../../shared/models/transfer-group-data.model';
import { GroupUserModalComponent } from '../group-user/group-user-modal';
import { ExDialog } from '../../../../shared/ui-common/modal/services/ex-dialog.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})

export class UserDetailComponent implements OnInit {

  public userdetail: User = new User();
  groupName: string;
  private transferData = new TransferGroupData();

  // Constructor
  constructor(private userService: UserService,
    private location: Location,
    private router: Router,
    private route: ActivatedRoute,
    private exDialog: ExDialog,
    private notifier: NotificationService) {

  }
  // Init user detail component
  ngOnInit() {
    const userId = this.route.snapshot.params['id'];
    if (userId) {
      this.getUserInfomation(userId);
    }
    this.groupName = this.userdetail.userGroup.name;
  }

  // Handle get user detail information.
  getUserInfomation(userId: string) {
    if (userId !== null) {
      this.userService.getUserById(userId).subscribe(user => {
        this.userdetail = user;
      },
        () => { this.goBack(); });
    }
  }

  // Handle delete user.
  async deleteUser() {
    await this.userService.remove(this.userdetail);

    // Back to user list page
    this.goBack();
  }

  // Handle change user group.
  changeUserGroup(user: User) {
    this.transferData.user = user;
    this.exDialog.openPrime(GroupUserModalComponent, { callerData: this.transferData });
  }

  // Handle navigate to Edit user page.
  navigateToEditPage() {
    this.router.navigate([UserNavigationRoute.EDIT_USER_PAGE, this.userdetail._id]);
  }

  navigateToUserDetailPage(user: User) {
    this.router.navigate([UserNavigationRoute.USER_DETAIL_PAGE, user._id]);
  }

  navigateToGroups(user: User) {
    this.router.navigate([UserNavigationRoute.GROUPS_PAGE, user.userGroup._id]);
  }

  private goBack() {
    this.location.back();
  }

}
