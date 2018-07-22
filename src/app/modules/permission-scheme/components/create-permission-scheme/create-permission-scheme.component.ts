import { Component, OnInit } from '@angular/core';
import { AbstractFormComponent } from '../../../../shared/abstract/abstract-form-component';
import {
  ControllerModel, ControllerSelectedItem, PermissionDetail,
  DataScope, PermissionScheme, SchemeDataSource
} from '../../../../shared/models/permission-scheme.model';
import { PermissionSchemeServcie } from '../../services/permission-scheme.service';
import { filter, isNil, isEmpty, contains, map, reject, remove, findIndex, propEq } from 'ramda';
import { PermissionFilterPipe } from '../../pipes/permission-scheme.pipe';
import { NotificationService } from '../../../../shared/services/notification.service';
import { TranslateService } from '../../../../shared/services/translate.service';
import { NotificationConst, IgnoreField, SchemeField, PermissionNavigationRoute } from '../../permission-scheme-const';
import { Router } from '@angular/router';
import { PermissionSchemeComponentBase } from '../../base/editor.permission-scheme.componentbase';

@Component({
  selector: 'app-create-permission-scheme',
  templateUrl: './create-permission-scheme.component.html',
  styleUrls: ['../../base/editor-permission-scheme.component.css']
})
export class CreatePermissionSchemeComponent extends PermissionSchemeComponentBase {

  Initialize() {
    this.initializeModel();
  }
  protected onValidated() {

  }

  protected execute() {
    this.schemeService.addPermissionScheme(JSON.stringify(this.permissionModel, (key, value) => {
      return this.replacer(key, value);
    })).subscribe(() => {
      const message = this.translateService.translate(NotificationConst.CreateSuccessfully, this.permissionModel.name);
      this.notificationService.showSuccess(message);
      this.onHandleCreateUserSuccessful();
    });
  }

  protected cancel() {
    this.router.navigate([PermissionNavigationRoute.LIST_PAGE]);
  }

  constructor(private schemeService: PermissionSchemeServcie,
    private readonly translateService: TranslateService,
    private router: Router,
    private notificationService: NotificationService) {
      super(schemeService);
  }

  protected initializeModel()  {
    this.dataSource = new SchemeDataSource();
    this.dataSource.data = [];
    this.dataSource.is_check_all = false;

    this.schemeService.getAllController().subscribe(controllers => {
      controllers.forEach(controller => {
        const controllerItem = new ControllerSelectedItem();
        controllerItem.controller = controller;
        controllerItem.is_check = false;
        controllerItem.is_disable = false;
        this.dataSource.data.push(controllerItem);
      });
    });

    this.permissionModel = new PermissionScheme();
    this.permissionModel.permission_details = [];
    this.permissionModel.name = '';

    this.isCreateAnother = false;
  }

  private onHandleCreateUserSuccessful() {
    if (this.isCreateAnother) {
      this.router.navigate([PermissionNavigationRoute.CREATE_PAGE]);
      this.initializeModel();
    } else {
      this.router.navigate([PermissionNavigationRoute.LIST_PAGE]);
    }
  }
}
