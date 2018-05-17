import { Component, OnInit } from '@angular/core';
import { UserModificationBase } from '../create-user/user-modification-base';
import { FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '../../../shared/services/translateService';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent extends UserModificationBase {
  constructor(fb: FormBuilder, translateService: TranslateService) {
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
    throw new Error('Method not implemented.');
  }
  protected onCancel() {
    throw new Error('Method not implemented.');
  }
}
