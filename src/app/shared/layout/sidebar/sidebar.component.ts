import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { BasicUserInfo } from '../../models/user.model';
import { ModuleRoute } from '../../constants/const';
import { VERSION_TOKEN, IVersionController } from '../../interfaces/version';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  currentUser: BasicUserInfo;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService,
    @Inject(VERSION_TOKEN) private readonly versionController: IVersionController) { }

  ngOnInit() {
    this.currentUser = this.authenticationService.getCurrentUser();
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

  navigateToNewsPage() {
    this.router.navigate([ModuleRoute.NEWS]);
  }

  navigateToPromotionPage() {
    this.router.navigate([ModuleRoute.PROMOTION]);
  }

  navigateToGiveVoucherPage() {
    this.router.navigate([`${ModuleRoute.PROMOTION}/give-voucher`]);
  }

  navigateToMemberManagementPage() {
    this.router.navigate([ModuleRoute.MEMBER]);
  }

  navigateToMembershipTypeListPage() {
    this.router.navigate([`${ModuleRoute.MEMBER}/${ModuleRoute.MEMBERSHIP_TYPE}`]);
  }

  navigateToVouchersPage() {
    this.router.navigate([ModuleRoute.VOUCHER]);
  }

  navigateToPosPage() {
    this.router.navigate([ModuleRoute.POS_AND_MENU]);
  }

  navigateToVoucherCreationPage() {
    this.router.navigate([`${ModuleRoute.VOUCHER}/create`]);
  }

  navigateToVouchersRunningPage() {
    this.router.navigate([`${ModuleRoute.VOUCHER}/vouchers-running`]);
  }

  showVersion() {
    this.versionController.showVersion();
  }
}
