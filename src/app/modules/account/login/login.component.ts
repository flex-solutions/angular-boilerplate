import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractFormComponent } from '../../../shared/abstract/abstract-form-component';
import { FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '../../../shared/services/translateService';
import {
  GenericValidator,
  IValidationMessage
} from '../../../shared/validation/generic-validator';
import { RecaptchaComponent } from 'ng-recaptcha';
import { AccountErrorCodes } from '../account-error-code.constant';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent extends AbstractFormComponent implements OnInit {
  @ViewChild('captchaRef') captchaRef: RecaptchaComponent;
  errorMessage: { [key: string]: string } = {}; // Error message for login form validation
  loginError: string; // Error message when login failed
  protected genericValidator: GenericValidator;

  constructor(
    private fb: FormBuilder,
    private translateService: TranslateService
  ) {
    super();

    // Create an instance of the generic validator
    this.genericValidator = new GenericValidator(
      this.validationMessages,
      this.translateService
    );
  }

  // Define validation message
  protected validationMessages: {
    [key: string]: { [key: string]: IValidationMessage };
  } = {
    username: {
      required: {
        message: AccountErrorCodes.EmptyUserName
      }
    },
    password: {
      required: {
        message: AccountErrorCodes.EmptyPassword
      }
    }
  };

  ngOnInit() {
    // Build login form
    this.formGroup = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  reCaptchaCallback(token) {
    if (!token || token.length === 0) {
      // Reset recaptcha
      this.captchaRef.reset();
      // Raise error reCaptcha invalid
      this.loginError = this.translateService.translate(
        AccountErrorCodes.InvalidRECAPTCHA
      );
    } else {
      // Check reCaptcha on service
      // Call api login
    }
  }

  protected onSubmit() {
    // Reset login error
    this.loginError = null;
    // Execute check captcha and login if recaptcha is valid
    this.captchaRef.execute();
  }

  protected onCancel() {
    // Not implementation
  }

  // Overload in base class to implement custom validation
  protected onValidate() {
    // Validate
    this.errorMessage = this.genericValidator.validate(this.formGroup);
  }
}
