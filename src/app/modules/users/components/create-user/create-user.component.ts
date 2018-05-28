import { NotificationService } from './../../../../shared/services/notification.service';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { UserModificationBase } from '../create-user/user-modification-base';
import { TranslateService } from '../../../../shared/services/translate.service';
import { GenericValidator } from '../../../../shared/validation/generic-validator';
import { FormBuilder, Validators } from '@angular/forms';
import { getBase64 } from '../../../../utilities/convert-image-to-base64';
import { User } from '../../../../shared/models/user.model';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { UserMessages, UserNavigationRoute } from '../../users.constant';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent extends UserModificationBase {
  tooltipContent: string;
  constructor(
    fb: FormBuilder,
    translateService: TranslateService,
    private userService: UserService,
    private notificationService: NotificationService,
    private router: Router,
    private location: Location
  ) {
    super(fb, translateService);
    this.tooltipContent = this.translateService.translate(
      'user-create_user-div-password_tooltip'
    );
  }

  protected onCreateUserForm() {
    // Build user form
    this.formGroup = this.fb.group({
      email: [
        '',
        [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+')]
      ],
      fullname: ['', [Validators.required]],
      username: ['', [Validators.required]],
      password: ['', []],
      createAnother: ['', []],
      branchId: ['', []]
    });
  }

  getPassword() {
    return this.formGroup.get('password').value;
  }

  protected onSubmit() {
    this.user = new User();

    // Convert image to Base64String
    getBase64('assets/images/defaultavatar.png')
      .then(data => {
        this.user.avatar = data.toString();
        this.user.email = this.getEmailValue();
        this.user.username = this.getUserNameValue();
        this.user.fullname = this.getFullNameValue();
        this.user.password = this.getPassword();
        this.user.branch_id = this.branch.id;
        this.user.isActive = true;
        // * Call API to create new user
        this.userService.create(this.user).subscribe(
          respond => {
            // * Create user successful, display success notification
            const msg = this.translateService.translate(UserMessages.CreateUserSuccessfull);
            this.notificationService.showSuccess(msg);
            this.onHandleCreateUserSuccessful();
          });
      });
  }

  protected onCancel() {
    this.location.back();
  }

  private onHandleCreateUserSuccessful() {
    const createOther = this.formGroup.get('createAnother').value;
    const createOtherAsString = String(createOther);
    if (createOtherAsString === 'true') {
      this.resetForm();
    } else {
      this.router.navigate([UserNavigationRoute.USERS_PAGE]);
    }
  }
}
