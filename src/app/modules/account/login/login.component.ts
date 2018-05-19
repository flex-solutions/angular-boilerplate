import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractFormComponent } from '../../../shared/abstract/abstract-form-component';
import { FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '../../../shared/services/translateService';
import {
  GenericValidator,
  IValidationMessage
} from '../../../shared/validation/generic-validator';
import { RecaptchaComponent } from 'ng-recaptcha';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent extends AbstractFormComponent implements OnInit {
  @ViewChild('captchaRef') captchaRef: RecaptchaComponent;
  errorMessage: { [key: string]: string } = {};
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
        message: 'account-login-validation-emptyUsername'
      }
    },
    password: {
      required: {
        message: 'account-login-validation-emptyPassword'
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
    console.log(`Resolved captcha with response ${token}:`); // TODO: Just for test
    if (!token || token.length === 0) {
      this.captchaRef.reset();
      // TODO: Raise error reCaptcha invalid
    } else {
      // Check reCaptcha on service
      // Call api login
    }
  }

  protected onSubmit() {
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
