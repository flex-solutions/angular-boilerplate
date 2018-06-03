import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { PermissionSchemeServcie } from '../../services/permission-scheme.service';
import { TranslateService } from '../../../../shared/services/translate.service';
import { NotificationService } from '../../../../shared/services/notification.service';
import { PermissionSchemeComponentBase } from '../../base/editor.permission-scheme.componentbase';
import { SchemeDataSource, ControllerSelectedItem, PermissionDetail } from '../../../../shared/models/permission-scheme.model';
import { NotificationConst, PermissionNavigationRoute } from '../../permission-scheme-const';
import { map, contains } from 'ramda';
@Component({
  selector: 'app-edit-permission-scheme',
  templateUrl: './edit-permission-scheme.component.html',
  styleUrls: ['./edit-permission-scheme.component.css']
})
export class EditPermissionSchemeComponent extends PermissionSchemeComponentBase {

  private id: string;

  constructor(private schemeService: PermissionSchemeServcie,
    private readonly translateService: TranslateService,
    private router: Router,
    private notificationService: NotificationService,
    private activatedRoute: ActivatedRoute) {
    super(schemeService);
    activatedRoute.params.subscribe(((params: Params) => {
      this.id = params['id'];
    }));
  }

  protected onValidated() {
  }

  protected execute() {
    this.schemeService.updatePermissionScheme(JSON.stringify(this.permissionModel, (key, value) => {
      return this.replacer(key, value);
    })).subscribe(() => {
      const message = this.translateService.translateWithParams(NotificationConst.EditSuccessfully, this.permissionModel.name);
      this.notificationService.showSuccess(message);
      this.onHandleEditUserSuccessful();
    });
  }

  protected cancel() {
    this.router.navigate([PermissionNavigationRoute.LIST_PAGE]);
  }

  private onHandleEditUserSuccessful() {
    this.router.navigate([PermissionNavigationRoute.LIST_PAGE]);
  }

  Initialize() {
    this.schemeService.findOneById(this.id).subscribe((scheme) => {
      this.permissionModel = scheme;
      this.permissionModel.permission_details = [];
      this.loadDataForPermissionDetails();
    });
  }

  loadDataForPermissionDetails() {
    this.schemeService.getPermissionDetails(this.id).subscribe(permissionDetails => {
      permissionDetails.forEach(permissionDetail => {
        const item = new PermissionDetail();
        item.controller = permissionDetail.controller._id;
        item.controller_name = permissionDetail.controller.name;
        item.is_insert = permissionDetail.is_insert;
        item.is_update = permissionDetail.is_update;
        item.is_delete = permissionDetail.is_delete;
        item.is_fullcontrol = item.is_insert && item.is_update && item.is_delete;
        item.data_scope = permissionDetail.data_scope;

        this.permissionModel.permission_details.push(item);
      });

      this.dataSource = new SchemeDataSource();
      this.dataSource.data = [];
      this.dataSource.is_check_all = false;

      this.loadDataForControllers();
    });
  }

  loadDataForControllers() {
    this.schemeService.getAllController().subscribe(controllers => {
      controllers.forEach(controller => {
        const controllerItem = new ControllerSelectedItem();
        controllerItem.controller = controller;
        if (this.isExisted(controller._id)) {
          controllerItem.is_check = true;
          controllerItem.is_disable = true;
        } else {
          controllerItem.is_check = false;
          controllerItem.is_disable = false;
        }

        this.onPermissionChanged(controller._id, false);
        this.dataSource.data.push(controllerItem);
      });
    });
  }

  isExisted(id: string): boolean {
    const listControllerId = map((item) => item.controller, this.permissionModel.permission_details);
    return contains(id, listControllerId);
  }
}
