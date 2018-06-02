import { Component, OnInit } from '@angular/core';
import { AbstractFormComponent } from '../../../shared/abstract/abstract-form-component';
import {
  ControllerModel,
  ControllerSelectedItem,
  PermissionDetail,
  DataScope,
  PermissionScheme,
  SchemeDataSource
} from '../../../shared/models/permission-scheme.model';
import { PermissionSchemeServcie } from '../services/permission-scheme.service';
import {
  filter,
  isNil,
  isEmpty,
  contains,
  map,
  reject,
  remove,
  findIndex,
  propEq
} from 'ramda';
import { PermissionFilterPipe } from '../pipes/permission-scheme.pipe';
import {
  NotificationConst,
  IgnoreField,
  SchemeField,
  PermissionNavigationRoute
} from '../permission-scheme-const';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
export abstract class PermissionSchemeComponentBase implements OnInit {
  errorMessage: { [key: string]: string } = {};

  public dataSource: SchemeDataSource;

  public permissionModel: PermissionScheme;

  public keyword = '';

  public isCreateAnother = false;

  constructor(
    private service: PermissionSchemeServcie,
  ) {}

  protected abstract OnValidated();

  protected abstract Execute();

  protected abstract Cancel();

  ngOnInit() {
    this.initializeModel();
  }

  onSubmit() {
      // validate value of binding model
      this.OnValidated();

      // do some logic here
      this.Execute();
  }

  onCancel() {
    this.Cancel();
  }

  initializeModel() {
    this.dataSource = new SchemeDataSource();
    this.dataSource.data = [];
    this.dataSource.is_check_all = false;

    this.service.getAllController().subscribe(controllers => {
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

  removePermission(id: string) {
    const deleteIndex = findIndex(
      propEq(SchemeField.ControllerId, id),
      this.permissionModel.permission_details
    );
    this.permissionModel.permission_details = remove(
      deleteIndex,
      1,
      this.permissionModel.permission_details
    );

    const rollBackControllerFilter = controllerItem => {
      return controllerItem.controller._id === id;
    };

    const controllers = filter(rollBackControllerFilter, this.dataSource.data);
    controllers.forEach(controller => {
      controller.is_disable = false;
      controller.is_check = false;
    });
  }

  addPermission() {
    const selectedFilter = item => {
      return item.is_check;
    };

    // filter the selected controller and add to permission array
    const selectedControllers = filter(selectedFilter, this.dataSource.data);
    this.addToPermissionList(selectedControllers);
  }

  onControllerCheckedChange(ischeckAll = false) {
    if (!ischeckAll) {
      this.dataSource.is_check_all = true;
      this.dataSource.data.forEach(item => {
        this.dataSource.is_check_all =
          this.dataSource.is_check_all && item.is_check;
      });
    } else {
      this.dataSource.data.forEach(item => {
        item.is_check = this.dataSource.is_check_all;
      });
    }
  }

  onPermissionChanged(id: string, ischeckAll: boolean) {
    this.permissionModel.permission_details.forEach(item => {
      if (item.controller === id) {
        if (ischeckAll) {
          item.is_insert = item.is_fullcontrol;
          item.is_update = item.is_fullcontrol;
          item.is_delete = item.is_fullcontrol;
        } else {
          item.is_fullcontrol =
            item.is_insert && item.is_update && item.is_delete;
        }
      }
    });
  }

  protected replacer(key, value) {
    if (
      key === IgnoreField.ControllerName ||
      key === IgnoreField.IsFullControl
    ) {
      return undefined;
    }
    return value;
  }

  private addToPermissionList(selectedControllers: ControllerSelectedItem[]) {
    // if selected controller have any data and don't existed in permission list
    // add new one, otherwise do nothing
    if (!isNil(selectedControllers) && !isEmpty(selectedControllers)) {
      selectedControllers.forEach(permission => {
        if (!this.isExistedPermission(permission.controller._id)) {
          const permissionDetail = new PermissionDetail();
          permissionDetail.controller = permission.controller._id;
          permissionDetail.controller_name = permission.controller.name;
          permissionDetail.is_delete = false;
          permissionDetail.is_update = false;
          permissionDetail.is_insert = false;
          permissionDetail.is_fullcontrol = false;
          permissionDetail.data_scope = DataScope.Branch;

          this.permissionModel.permission_details.push(permissionDetail);

          // permission.is_disable = true;
        }
      });
    }
  }

  private isExistedPermission(id: string): boolean {
    const permissionIdArray = map(
      item => item.controller,
      this.permissionModel.permission_details
    );
    return contains(id, permissionIdArray);
  }
}
