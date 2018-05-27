import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { NavigationExtras, Router, ActivatedRoute } from '@angular/router';
import { User } from '../../../../shared/models/user.model';
import { UserService } from '../../services/user.service';
import { NotificationService } from '../../../../shared/services/notification.service';
import { UserNavigationRoute } from '../../users.constant';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})

export class UserDetailComponent implements OnInit {

  userdetail: User = new User;

  // Constructor
  constructor(private userService: UserService,
    private location: Location,
    private router: Router,
    private route: ActivatedRoute,
    private notifier: NotificationService) { }

  // Init user detail component
  ngOnInit() {
    const userId = this.route.snapshot.params['id'];
    if (userId) {
      this.getUserInfomation(userId);
    }
  }

  // Handle get user detail information.
  getUserInfomation(userId: string) {
    if (userId !== null) {
      this.userService.getUserById(userId).subscribe(user => {
        this.userdetail = user;
      });
    }
  }

  // Handle delete user.
  deleteUser() {
    this.userService.remove(this.userdetail);
  }

  // Handle change user group.
  changeUserGroup() {
    this.goBack();
  }

  // Handle navigate to Edit user page.
  navigateToEditPage() {
    this.router.navigate([UserNavigationRoute.EDIT_USER_PAGE, this.userdetail._id]);
  }

  navigateToUserDetailPage(user: User) {
    this.router.navigate([UserNavigationRoute.USER_DETAIL_PAGE, user._id]);
  }

  private goBack() {
    this.location.back();
  }

}
