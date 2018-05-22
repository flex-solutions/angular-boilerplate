import { UserService } from './../services/user.service';
import { Component, OnInit } from '@angular/core';
import { UserModificationBase } from '../create-user/user-modification-base';
import { FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '../../../shared/services/translate.service';
import { User } from '../../../shared/models/user.model';
import { UserMessages } from '../user.message';
import { NotificationService } from '../../../shared/services/notification.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent extends UserModificationBase {
  constructor(fb: FormBuilder,
    translateService: TranslateService,
    private readonly userService: UserService,
    private readonly notificationService: NotificationService) {
    super(fb, translateService);
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
      isActive: ['', []]
    });
  }

  protected onSubmit() {
    // Update new value
    this.user.email = this.getEmailValue();
    this.user.username = this.getUserNameValue();
    this.user.fullname = this.getFullNameValue();

    // * Call API to update user
    this.userService.update(this.user).then(respond => {
      // * Save user successful, display success notification
      const msg = this.translateService.translate(
        UserMessages.EditUserSuccessfull
      );

      this.notificationService.showSuccess(msg);
    }).catch(error => {
      // * Failed to update user
      this.notificationService.showError(error);
    });
  }

  protected onCancel() {
    // Ignore
  }
}
