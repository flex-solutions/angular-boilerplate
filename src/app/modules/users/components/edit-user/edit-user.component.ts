import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { UserModificationBase } from '../create-user/user-modification-base';
import { FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '../../../../shared/services/translate.service';
import { User } from '../../../../shared/models/user.model';
import { Location } from '@angular/common';
import { NotificationService } from '../../../../shared/services/notification.service';
import { UserMessages } from '../../users.constant';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent extends UserModificationBase {
  constructor(fb: FormBuilder,
    translateService: TranslateService,
    private readonly userService: UserService,
    private readonly notificationService: NotificationService,
    private location: Location,
    private activatedRoute: ActivatedRoute,
  ) {
    super(fb, translateService);
    // Detect page is update mode
    const userId = this.activatedRoute.snapshot.params['id'];
    if (userId) {
      this.getUser(userId);
    }
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
      isActive: ['', []],
      branchId: ['', []],
    });

    // Load user data into form
  }



  protected onSubmit() {
    // Update new value
    this.user.email = this.getEmailValue();
    this.user.username = this.getUserNameValue();
    this.user.fullname = this.getFullNameValue();
    this.user.branch_id = this.branch.id;
    this.user.isActive = this.isActive;
    // * Call API to update user
    this.userService.update(this.user).subscribe(respond => {
      // * Save user successful, display success notification
      const msg = this.translateService.translate(
        UserMessages.EditUserSuccessfull
      );

      this.notificationService.showSuccess(msg);
    });
  }

  protected onCancel() {
    this.location.back();
  }

  private getUser(userId: string) {
    this.userService.getUserById(userId).subscribe(user => {
      this.user = new User();
      Object.assign(this.user, user);
      this.selectedBranch = this.branches.find(b => b.id === this.user.branch_id);
      this.formGroup.setValue({
        email: this.user.email,
        fullname: this.user.fullname,
        username: this.user.username,
        isActive: this.user.isActive ? this.user.isActive : true,
        branchId: this.selectedBranch
      });
    });
  }

  get isActive() {
    const isActive = this.formGroup.get('isActive').value;
    return isActive as boolean;
  }
}
