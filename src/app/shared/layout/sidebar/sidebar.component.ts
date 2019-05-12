import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { BasicUserInfo } from '../../models/user.model';
import { ModuleRoute } from '../../constants/const';
import { VERSION_TOKEN, IVersionController } from '../../interfaces/version';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  currentUser: BasicUserInfo;
  isAuthentication: boolean;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService,
    @Inject(VERSION_TOKEN)
    private readonly versionController: IVersionController
  ) {}

  ngOnInit() {
    this.currentUser = this.authenticationService.getCurrentUser();
    this.isAuthentication = environment.authentication;
  }

  navigateToUsersPage() {
    this.router.navigate([ModuleRoute.USER]);
  }

  navigateToUserGroupsPage() {
    this.router.navigate([ModuleRoute.USER_GROUP]);
  }

  navigateToPermissionSchemesPage() {
    this.router.navigate([ModuleRoute.PERMISSION_SCHEMES]);
  }

  showVersion() {
    this.versionController.showVersion();
  }
}
