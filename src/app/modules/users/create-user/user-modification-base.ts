import { FormGroup, FormBuilder } from '@angular/forms';
import {
  GenericValidator,
  IValidationMessage
} from '../../../shared/validation/generic-validator';
import { TranslateService } from '../../../shared/services/translateService';
import { OnInit } from '@angular/core/src/core';

export abstract class UserModificationBase implements OnInit {
  protected userFormGroup: FormGroup;
  public errorMessage: { [key: string]: string } = {};
  protected genericValidator: GenericValidator;

  // Define validation message
  protected validationMessages: {
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
    protected fb: FormBuilder,
    protected translateService: TranslateService
  ) {
    // Create an instance of the generic validator
    this.genericValidator = new GenericValidator(
      this.validationMessages,
      this.translateService
    );
  }

  ngOnInit(): void {
    this.onCreateUserForm();
  }

  protected abstract onCreateUserForm();

  public getEmailValue(): string {
    return this.userFormGroup.get('email').value;
  }

  public getUserNameValue(): string {
    return this.userFormGroup.get('username').value;
  }

  public submit() {
    this.validate();
  }
  protected abstract onSubmit();

  public cancel() {
    this.onCancel();
  }

  protected abstract onCancel();

  protected validate() {
    // Validate
    this.errorMessage = this.genericValidator.validate(this.userFormGroup);
  }
}
