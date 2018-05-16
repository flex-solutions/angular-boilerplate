import { Component, OnInit, ViewChildren, ElementRef } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControlName
} from '@angular/forms';
import {
  GenericValidator,
  IValidationMessage
} from '../../../shared/validation/generic-validator';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import { TranslateService } from '../../../shared/services/translateService';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  signupFormGroup: FormGroup;
  errorMessage: { [key: string]: string } = {};
  genericValidator: GenericValidator;

  // Define validation message
  private validationMessages: {
    [key: string]: { [key: string]: IValidationMessage };
  } = {
    email: {
      required: { message: 'user-create_user-label-validation_requireEmail' },
      pattern: { message: 'user-create_user-label-validation_invalidEmail' },
      unique: {
        message: 'user-create_user-label-validation_uniqueEmail',
        params: null,
        paramsCallback: () => {
          return [this.getEmailValue()];
        }
      }
    },
    fullname: {
      required: { message: 'user-create_user-label-validation_requireFullname' }
    },
    username: {
      required: {
        message: 'user-create_user-label-validation_requireUserName'
      },
      unique: {
        message: 'user-create_user-label-validation_uniqueUserName',
        params: null,
        paramsCallback: () => {
          return [this.getUserNameValue()];
        }
      }
    }
  };

  constructor(
    private fb: FormBuilder,
    private multilingualProvider: TranslateService
  ) {
    // Create an instance of the generic validator
    this.genericValidator = new GenericValidator(
      this.validationMessages,
      this.multilingualProvider
    );
  }

  ngOnInit() {
    this.createSignupForm();
  }

  private createSignupForm(): void {
    // Build user form
    this.signupFormGroup = this.fb.group({
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

  getEmailValue(): string {
    return this.signupFormGroup.get('email').value;
  }

  getUserNameValue(): string {
    return this.signupFormGroup.get('username').value;
  }

  submit(): void {
    // Validate
    this.errorMessage = this.genericValidator.validate(this.signupFormGroup);

    // Do stuff
    const emailValue = this.getEmailValue();
  }
}
