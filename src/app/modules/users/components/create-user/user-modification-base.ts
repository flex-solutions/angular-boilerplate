import { Branch } from './../../../../shared/models/branch.model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { GenericValidator, IValidationMessage } from '../../../../shared/validation/generic-validator';
import { TranslateService } from '../../../../shared/services/translate.service';
import { OnInit } from '@angular/core/src/core';
import { AbstractFormComponent } from '../../../../shared/abstract/abstract-form-component';
import { User } from '../../../../shared/models/user.model';
import ArrayExtension from '../../../../utilities/array.extension';
import { BranchService } from '../../services/branch.service';
import { EventEmitter } from 'events';
import { appVariables } from '../../../../app.constant';

export abstract class UserModificationBase extends AbstractFormComponent
  implements OnInit {
  branches: Branch[];
  selectedBranch: Branch;
  protected user: User;
  protected eventEmmiter = new EventEmitter();

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
        },
        maxlength: {
          message: 'user-create_user-label-validation_maxlength_username'
        },
        pattern: {
          message: 'user-create_user-label-validation_invalid_username'
        }
      },
      branchId: {}
    };

  constructor(
    protected fb: FormBuilder,
    protected translateService: TranslateService,
    protected branchService: BranchService
  ) {
    super();

    // Create an instance of the generic validator
    this.genericValidator = new GenericValidator(
      this.validationMessages,
      this.translateService
    );
  }

  ngOnInit(): void {
    this.onCreateUserForm();
    this.initializeBranches();
  }

  protected initializeBranches() {
    this.branches = [];
    // Call service to get list branch
    this.branchService.getAll().subscribe(result => {
      this.branches = result;
      this.selectDefaultBranch();

      this.eventEmmiter.emit('onBranchLoaded');
    });
  }

  protected abstract onCreateUserForm();

  protected selectDefaultBranch() {
    // selected default branch
    this.selectedBranch = this.branches.find(b => b.name === appVariables.defaultHOBranch);
    if (this.selectedBranch) {
      this.formGroup.patchValue({ branchId: this.selectedBranch });
    }
  }

  getEmailValue(): string {
    return this.formGroup.get('email').value;
  }

  getUserNameValue(): string {
    return this.formGroup.get('username').value;
  }

  getFullNameValue() {
    return this.formGroup.get('fullname').value;
  }

  get branch(): Branch {
    return this.formGroup.get('branchId').value;
  }

  // Overload in base class to implement custom validation
  protected onValidate() {
    // Validate
    this.validateBranch();
  }

  private validateBranch() {
    if (!this.branch) {
      this.errorMessage['branchId'] += this.translateService.translate('user-create_user-label-validation_requireBranch');
    }
  }
}
