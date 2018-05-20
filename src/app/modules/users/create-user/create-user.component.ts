import { Component, OnInit } from '@angular/core';
import { UserModificationBase } from '../create-user/user-modification-base';
import { TranslateService } from '../../../shared/services/translate.service';
import { GenericValidator } from '../../../shared/validation/generic-validator';
import { FormBuilder, Validators } from '@angular/forms';
import { getBase64 } from '../../../utilities/convert-image-to-base64';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent extends UserModificationBase {
  tooltipContent: string;
  constructor(fb: FormBuilder, translateService: TranslateService) {
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
      createAnother: ['', []]
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

        // TODO: Call API to create new user
      })
      .catch(err => {
        console.error(err);
      });
  }
  protected onCancel() {
    throw new Error('Method not implemented.');
  }
}
