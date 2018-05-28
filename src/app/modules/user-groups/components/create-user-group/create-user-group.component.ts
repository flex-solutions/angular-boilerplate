import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Observable, of } from 'rxjs';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators
} from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AbstractFormComponent } from '../../../../shared/abstract/abstract-form-component';
import { UserGroup } from '../../../../shared/models/user-group.model';
import { TranslateService } from '../../../../shared/services/translate.service';
import { UserGroupService } from '../../services/usergroup.service';
import { NotificationService } from '../../../../shared/services/notification.service';
import { Errors } from '../../errors/errors';
import { RouteNames } from '../../constants/user-groups.constant';

@Component({
  selector: 'app-create-edit-user-group',
  templateUrl: './create-user-group.component.html',
  styleUrls: ['./create-user-group.component.css']
})
export class CreateEditUserGroupComponent extends AbstractFormComponent
  implements OnInit {
  editMode = false;
  userGroup: UserGroup;
  userGroupId: string;
  public errors = {
    groupname: [
      {
        type: 'unique',
        message: 'user_groups-create_user_group-error_group_name_unique'
      },
      {
        type: 'required',
        message: 'user_groups-create_user_group-error_group_name_required'
      }
    ]
  };

  get groupname() {
    return this.formGroup.get('groupname');
  }

  get createAnother() {
    return this.formGroup.get('createAnother');
  }

  get description() {
    return this.formGroup.get('description');
  }

  constructor(
    private location: Location,
    private formbuilder: FormBuilder,
    private translateService: TranslateService,
    private userGroupService: UserGroupService,
    private notificationService: NotificationService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    super();
  }

  ngOnInit() {
    this.userGroup = new UserGroup();
    this.route.params.subscribe((params: Params) => {
      this.userGroupId = params['id'] ? params['id'] : '';
      this.editMode = params['id'] ? true : false;
      this.initForm();
    });
    this.onCreateForm();
  }

  private initForm() {
    if (this.editMode) {
      this.userGroupService.getById(this.userGroupId).subscribe(
        (value: UserGroup) => {
          if (value) {
            this.groupname.setValue(value.group_name);
            this.description.setValue(value.description);
          } else {
            // Navigate to home if user group not found
            this.router.navigate([RouteNames.HOME]);
          }
        },
        error => this.notificationService.showError(error)
      );
    }
  }

  protected onCreateForm() {
    this.formGroup = this.formbuilder.group({
      groupname: ['', [Validators.required]],
      description: ['', []],
      createAnother: ['', []]
    });
  }

  protected onSubmit() {
    if (!this.editMode) {
      this.userGroupService.create(this.userGroup).subscribe(
        (value: UserGroup) => {
          // * Create user successful, display success notification
          const msg = this.getMessage(
            Errors.Create_User_Group_Sucess,
            this.userGroup.group_name
          );

          this.notificationService.showSuccess(msg);
          this.doPostAction();
        },
        error => {
          // * Failed to create user
          this.notificationService.showError(error);
        }
      );
    } else {
      this.userGroupService.update(this.userGroup).subscribe(
        (value: UserGroup) => {
          // * Create user successful, display success notification
          const msg = this.getMessage(
            Errors.Edit_User_Group_Success,
            this.userGroup.group_name
          );

          this.notificationService.showSuccess(msg);
          this.doPostAction();
        },
        error => {
          // * Failed to create user
          this.notificationService.showError(error);
        }
      );
    }
  }

  protected onCancel() {
    this.location.back();
  }

  protected onValidate() {}

  protected getMessage(key: string, ...params) {
    if (params.length) {
      return this.translateService.translateWithParams(key, params);
    }
    return this.translateService.translate(key);
  }

  private doPostAction() {
    if (!this.editMode || (this.createAnother && this.createAnother.value)) {
      this.groupname.reset();
      this.description.reset();
    } else {
      this.location.back();
    }
  }
}
