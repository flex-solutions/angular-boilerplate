import { Component, OnInit, ViewChild, Inject, LOCALE_ID, AfterViewInit } from '@angular/core';
import { AbstractFormComponent } from '../../../shared/abstract/abstract-form-component';
import { FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '../../../shared/services/translate.service';
import {
  GenericValidator,
  IValidationMessage
} from '../../../shared/validation/generic-validator';
import { InvisibleReCaptchaComponent } from 'ngx-captcha';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent extends AbstractFormComponent implements OnInit, AfterViewInit {
  captchaResponse: string;
  errorMessage: { [key: string]: string } = {};
  protected genericValidator: GenericValidator;
  @ViewChild('captchaElem') captchaElem: InvisibleReCaptchaComponent;

  constructor(
    private fb: FormBuilder,
    private translateService: TranslateService,
    @Inject(LOCALE_ID) protected localeId: string) {

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

  ngAfterViewInit() {
    this.captchaElem.hl = this.localeId;
  }

  ngOnInit() {
    // Build login form
    this.formGroup = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  onReCaptchaResolved(responde) {
    this.captchaResponse = responde;
    console.log(`Resolved captcha with response ${this.captchaResponse}:`);
    if (this.captchaResponse) {
      this.captchaElem.resetCaptcha();
    }
  }

  protected onSubmit() {
    // Execute check captcha
    console.log('onSubmit');
    this.captchaElem.execute();
  }

  protected onCancel() {
    // Ignore
  }

  // Overload in base class to implement custom validation
  protected onValidate() {
    // Validate
    this.errorMessage = this.genericValidator.validate(this.formGroup);
  }
}
