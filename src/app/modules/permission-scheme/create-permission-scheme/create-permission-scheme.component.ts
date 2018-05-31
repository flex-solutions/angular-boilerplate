import { Component, OnInit } from '@angular/core';
import { AbstractFormComponent } from '../../../shared/abstract/abstract-form-component';
import { ControllerModel, ControllerSelectedItem, PermissionDetail, DataScope } from '../../../shared/models/permission-scheme.model';
import { PermissionSchemeServcie } from '../services/permission-scheme.service';
import { filter, isNil, isEmpty, contains, map } from 'ramda';

@Component({
  selector: 'app-create-permission-scheme',
  templateUrl: './create-permission-scheme.component.html',
  styleUrls: ['./create-permission-scheme.component.css']
})
export class CreatePermissionSchemeComponent extends AbstractFormComponent implements OnInit {

  errorMessage: { [key: string]: string } = {};

  public items: ControllerSelectedItem[] = [];

  public permissionDetails: PermissionDetail[] = [];

  public Keyword = '';

  constructor(private service: PermissionSchemeServcie) {

    super();
    service.getAllController().subscribe(controllers => {
      controllers.forEach((controller) => {
        const controllerItem = new ControllerSelectedItem();
        controllerItem.controller = controller;
        controllerItem.is_check = false;
        this.items.push(controllerItem);
      });
    });
  }

  ngOnInit() {
  }

  protected onSubmit() {
    throw new Error('Method not implemented.');
  }

  protected onCancel() {
    throw new Error('Method not implemented.');
  }

  addPermission() {
    const selectedFilter = (item) => {
      if (item.is_check) {
        return true;
      }

      return false;
    };

    // filter the selected controller and add to permission array
    const selectedControllers = filter(selectedFilter, this.items);
    this.addToPermissionList(selectedControllers);
  }

  onChanged(event: any) {
    this.items.forEach((item) => {
      item.is_check = event.target.checked;
    });
  }

  private addToPermissionList(selectedControllers: ControllerSelectedItem[]) {
    console.log(this.Keyword);
    // if selected controller have any data and don't existed in permission list
    // add new one, otherwise do nothing
    if (!isNil(selectedControllers) && !isEmpty(selectedControllers)) {
      selectedControllers.forEach(permission => {
        if (!this.isExistedPermission(permission.controller._id)) {
          const permissionDetail = new PermissionDetail();
          permissionDetail.controller_id = permission.controller._id;
          permissionDetail.controller_name = permission.controller.name;
          permissionDetail.is_delete = false;
          permissionDetail.is_update = false;
          permissionDetail.is_insert = false;
          permissionDetail.data_scope = DataScope.Branch;

          this.permissionDetails.push(permissionDetail);
        }
      });
    }
  }

  private isExistedPermission(id: string): boolean {
    const permissionIdArray = map((item) => item.controller_id, this.permissionDetails);
    return contains(id, permissionIdArray);
  }
}
