import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AbstractFormComponent } from '../../../../shared/abstract/abstract-form-component';
import {
  IValidationMessage,
  GenericValidator
} from '../../../../shared/validation/generic-validator';
import { AccountMessages } from '../../account.message';
import { TranslateService } from '../../../../shared/services/translate.service';
import { AuthenticationService } from '../../../../shared/services/authentication.service';
import { Location } from '@angular/common';
import { ResetResponse } from '../../model/reset-response.model';

@Component({
  selector: 'app-recovery-password',
  templateUrl: './recovery-password.component.html',
  styleUrls: ['./recovery-password.component.css']
})
export class RecoveryPasswordComponent extends AbstractFormComponent
  implements OnInit {
  formGroup: FormGroup;
  submitted: boolean;
  isSuccess: boolean;
  errorMessage: { [key: string]: string } = {};
  protected genericValidator: GenericValidator;
  protected validationMessages: {
    [key: string]: { [key: string]: IValidationMessage };
  } = {
    email: {
      required: {
        message: AccountMessages.EmailEmpty
      },
      pattern: {
        message: AccountMessages.EmailInvalid
      }
    }
  };

  constructor(
    private location: Location,
    private fb: FormBuilder,
    private translateService: TranslateService,
    private authService: AuthenticationService
  ) {
    super();
    this.genericValidator = new GenericValidator(
      this.validationMessages,
      this.translateService
    );
  }

  ngOnInit() {
    this.formGroup = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '^[_a-z0-9]+(.[_a-z0-9]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,4})$'
          )
        ]
      ]
    });
  }

  protected onSubmit() {
    this.authService.recoverPassword<ResetResponse>(this.email).subscribe(t => {
      if (t.token) {
        this.isSuccess = true;
      } else {
        this.isSuccess = false;
      }
    });
  }

  protected onValidate(): void {
    this.errorMessage = this.genericValidator.validate(this.formGroup);
  }

  protected onCancel() {}

  back() {
    this.location.back();
  }

  get email() {
    return this.formGroup.get('email').value;
  }
}
