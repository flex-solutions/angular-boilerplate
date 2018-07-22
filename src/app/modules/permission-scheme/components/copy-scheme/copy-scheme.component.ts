import { Component, OnInit } from '@angular/core';
import { DialogComponent } from '../../../../shared/ui-common/modal/components/dialog.component';
import { DialogService } from '../../../../shared/ui-common/modal/services/dialog.service';
import { IPermissionScheme } from '../../../../shared/models/permission-scheme.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IValidationMessage, GenericValidator } from '../../../../shared/validation/generic-validator';
import { TranslateService } from '../../../../shared/services/translate.service';
import { PermissionSchemeServcie } from '../../services/permission-scheme.service';

@Component({
  selector: 'app-copy-scheme',
  templateUrl: './copy-scheme.component.html',
  styleUrls: ['./copy-scheme.component.css']
})
export class CopySchemeComponent extends DialogComponent implements OnInit {
  schemeDescription: string;
  copiedPermissionScheme: IPermissionScheme;
  formGroup: FormGroup;
  errorMessage: { [key: string]: string } = {};

  protected genericValidator: GenericValidator;

  // Define validation message
  protected validationMessages: { [key: string]: { [key: string]: IValidationMessage }; } = {
    schemeName: {
      required: { message: 'permission-scheme-copy-validation-scheme_name' }
    }
  };

  constructor(protected dialogService: DialogService, protected fb: FormBuilder, protected translateService: TranslateService,
    private permissionService: PermissionSchemeServcie) {
    super(dialogService);
  }

  ngOnInit() {
    // Clone permission scheme
    const selectScheme = {};
    Object.assign(selectScheme, this.callerData);
    this.copiedPermissionScheme = selectScheme as IPermissionScheme;

    this.formGroup = this.fb.group({
      schemeName: ['', [Validators.required]]
    });

    // Build scheme description
    const schemeDescription = this.translateService.translate('permission-scheme-copy-label-scheme_description',
      this.copiedPermissionScheme.name);
    this.schemeDescription = schemeDescription;

    // Set default value for sheme name
    const newSchemeName = `copy-from-${this.copiedPermissionScheme.name}`;
    this.formGroup.patchValue({
      schemeName: newSchemeName
    });

    // Create an instance of the generic validator
    this.genericValidator = new GenericValidator(
      this.validationMessages,
      this.translateService
    );
  }

  public cancel() {
    this.result = false;
    this.dialogResult();
  }

  public submit() {
    // Update new name for copied scheme
    this.copiedPermissionScheme.name = this.schemeName;

    // Validate and call api to clone permission scheme
    if (this.validate()) {
      this.permissionService.clone(this.copiedPermissionScheme).subscribe(response => {
        this.result = true;
        this.dialogResult();
      });
    }
  }

  private validate() {
    // Validate
    this.errorMessage = this.genericValidator.validate(this.formGroup);
    if (this.formGroup === undefined || this.formGroup.invalid) {
      return false;
    }
    return true;
  }

  get schemeName() {
    return this.formGroup.get('schemeName').value;
  }
}
