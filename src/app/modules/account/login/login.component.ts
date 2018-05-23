import { AuthenticationService } from './../../../shared/services/authentication.service';
import { NavigateConstant } from './../../../shared/constants/navigate.constant';
import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractFormComponent } from '../../../shared/abstract/abstract-form-component';
import { FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '../../../shared/services/translate.service';
import { GenericValidator, IValidationMessage } from '../../../shared/validation/generic-validator';
import { InvisibleReCaptchaComponent } from 'ngx-captcha';
import { AccountMessages } from '../account.message';
import { SignedUser } from '../../../shared/models/user.model';
import { HttpExceptionResponse } from '../../../shared/models/http-exception-response.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent extends AbstractFormComponent implements OnInit {
  @ViewChild('captchaRef') captchaRef: InvisibleReCaptchaComponent;
  errorMessage: { [key: string]: string } = {}; // Error message for login form validation
  loginError: string; // Error message when login failed
  protected genericValidator: GenericValidator;

  constructor(
    private fb: FormBuilder,
    private translateService: TranslateService,
    private router: Router,
    private authService: AuthenticationService
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
          message: AccountMessages.EmptyUserName
        }
      },
      password: {
        required: {
          message: AccountMessages.EmptyPassword
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
      this.captchaRef.resetCaptcha();
      // Raise error reCaptcha invalid
      this.loginError = this.translateService.translate(AccountMessages.InvalidRECAPTCHA);
    } else {
      const signedUser = new SignedUser();
      signedUser.username = this.username;
      signedUser.password = this.password;
      signedUser.usertoken = token;

      // Call api login
      this.authService.login(signedUser)
        .catch(error => {
          this.captchaRef.resetCaptcha();
          // Failed to login
          const httpException = error.json() as HttpExceptionResponse;
          this.onHandleException(httpException);
        });
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

  private onHandleException(httpException: HttpExceptionResponse) {
    if (httpException.message.message) {
      const errorMsg = httpException.message.message.content[this.translateService.currentLocale];
      this.loginError = errorMsg;
    }
  }

  get username() {
    return this.formGroup.get('username').value;
  }

  get password() {
    return this.formGroup.get('password').value;
  }
}
