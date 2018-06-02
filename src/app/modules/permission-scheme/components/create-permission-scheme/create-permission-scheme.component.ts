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
import { FormBuilder, Validators } from '@angular/forms';
import { PermissionSchemeComponentBase } from '../base/editor.permission-scheme.componentbase';

@Component({
  selector: 'app-create-permission-scheme',
  templateUrl: './create-permission-scheme.component.html',
  styleUrls: ['./create-permission-scheme.component.css']
})
export class CreatePermissionSchemeComponent extends PermissionSchemeComponentBase {

  protected onValidated() {

  }

  protected execute() {
    this.schemeService.addPermissionScheme(JSON.stringify(this.permissionModel, (key, value) => {
      return this.replacer(key, value);
    })).subscribe(() => {
      const message = this.translateService.translateWithParams(NotificationConst.CreateSuccessfully, this.permissionModel.name);
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
    protected fb: FormBuilder,
    private notificationService: NotificationService) {
      super(schemeService);
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
