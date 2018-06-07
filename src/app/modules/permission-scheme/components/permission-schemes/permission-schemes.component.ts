import { NotificationService } from './../../../../shared/services/notification.service';
import { TranslateService } from './../../../../shared/services/translate.service';
import { PermissionSchemeDetailComponent } from './../scheme-detail/permission-scheme-detail.component';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IFilterChangedEvent } from '../../../../shared/ui-common/datagrid/components/datagrid.component';
import { IPermissionScheme } from '../../../../shared/models/permission-scheme.model';
import { PermissionSchemeServcie } from '../../services/permission-scheme.service';
import { ExDialog } from '../../../../shared/ui-common/modal/services/ex-dialog.service';
import { CopySchemeComponent } from '../copy-scheme/copy-scheme.component';
import { AssignPermissionComponent } from '../assign-permission/assign-permission.component';
import { ModalSize } from '../../../../shared/ui-common/modal/components/dialog.component';
import { PermissionNavigationRoute } from '../../permission-scheme-const';
import { Router } from '@angular/router';
import { contains } from 'ramda';
import { DefaultPermissionScheme } from '../../../../shared/constants/const';
import { UserGroup } from '../../../../shared/models/user-group.model';
import { ModuleRoute } from '../../../../shared/constants/const';
import { UserNavigationRoute } from '../../../users/users.constant';

@Component({
  selector: 'app-permission-schemes',
  templateUrl: './permission-schemes.component.html',
  styleUrls: ['./permission-schemes.component.css']
})
export class PermissionSchemesComponent implements OnInit {
  items: IPermissionScheme[];
  currentFilterArgs: IFilterChangedEvent;

  constructor(private permissionService: PermissionSchemeServcie,
    private router: Router,
    private dialogManager: ExDialog,
    private translateService: TranslateService,
    private notificationService: NotificationService) {
  }

  ngOnInit() {}

  assignToUserGroups(item) {
    this.dialogManager
      .openPrime(AssignPermissionComponent, { callerData: item })
      .subscribe(result => {
        if (result) {
          this.loadPermissionSchemes();
        }
      });
  }

  copy(item) {
    this.dialogManager
      .openPrime(CopySchemeComponent, { callerData: item })
      .subscribe(result => {
        if (result) {
          this.loadPermissionSchemes();
        }
      });
  }

  navigateToEditPage(item) {
    this.router.navigate([`${PermissionNavigationRoute.EDIT_PAGE}${item._id}`]);
  }

  navigateToCreatePage() {
    this.router.navigate([PermissionNavigationRoute.CREATE_PAGE]);
  }

  public count = (searchKey: string): Observable<number> => {
    return this.permissionService.count(searchKey);
  }

  onPageChanged(eventArg: IFilterChangedEvent) {
    this.currentFilterArgs = eventArg;
    this.loadPermissionSchemes();
  }

  loadPermissionSchemes() {
    const pagination = this.currentFilterArgs.pagination;
    this.permissionService
      .getPermissionSchemes(
        pagination.itemsPerPage,
        pagination.page,
        this.currentFilterArgs.searchKey
      )
      .subscribe((response: IPermissionScheme[]) => {
        this.items = response;
      });
  }

  viewPermissionDetail(scheme) {
    this.dialogManager.openPrime(PermissionSchemeDetailComponent, { callerData: scheme }, ModalSize.Large);
  }

  needToAlignTop(scheme: IPermissionScheme) {
    return scheme.userGroups && scheme.userGroups.length > 1;
  }

  canDeletePermissionScheme(scheme) {
    return !contains(scheme.name, [DefaultPermissionScheme.ADMINISTRATOR, DefaultPermissionScheme.USER]);
  }

  deletePermissionScheme(scheme) {
    const confirmMsg = this.translateService.translateWithParams('permission_scheme-delete-confirm', scheme.name);
    this.dialogManager.openConfirm(confirmMsg).subscribe(result => {
      if (result) {
        const successMessage = this.translateService.translateWithParams('permission_scheme-delete-success', scheme.name);
        this.permissionService.deleteScheme(scheme._id).subscribe(res => {
          this.notificationService.showSuccess(successMessage);
        });
      }
    });
  }

  navigateToGroup(userGroup: UserGroup) {
    this.router.navigate([
      `${UserNavigationRoute.GROUPS_PAGE}/filter`,
      userGroup.name
    ]);
  }
}
