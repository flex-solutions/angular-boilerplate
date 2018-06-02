import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { BasicUserInfo } from '../../models/user.model';
import { ModuleRoute } from '../../constants/const';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  currentUser: BasicUserInfo;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.currentUser = this.authenticationService.getCurrentUser();
  }

  navigateToUsersPage() {
    this.router.navigate([ModuleRoute.USER], { relativeTo: this.route });
  }

  navigateToUserGroupsPage() {
    this.router.navigate([ModuleRoute.USER_GROUP], { relativeTo: this.route });
  }

  navigateToPermissionSchemesPage() {
    this.router.navigate([ModuleRoute.PERMISSION_SCHEMES], { relativeTo: this.route });
  }
}
