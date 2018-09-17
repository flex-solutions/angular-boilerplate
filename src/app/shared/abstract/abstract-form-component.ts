import { OnInit } from '@angular/core/src/core';
import { AfterViewInit, ElementRef, ViewChildren } from '@angular/core';
import { FormGroup, FormControlName } from '@angular/forms';
import { AbstractBaseComponent } from './abstract-base-component';
import { GenericValidator } from '../validation/generic-validator';
import { Observable, merge, fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { isNullOrEmptyOrUndefined } from '../../utilities/util';

// Define common behavior for Form component
export abstract class AbstractFormComponent extends AbstractBaseComponent
  implements AfterViewInit, OnInit {
  formGroup: FormGroup;
  errorMessage: { [key: string]: string } = {};
  @ViewChildren(FormControlName, { read: ElementRef })
  formControls: ElementRef[];
  protected genericValidator: GenericValidator;

  public isCreateAnother: boolean;
  isEdit = false;

  // a flag to be used in template to indicate whether the user tried to submit the form
  submitted = false;

  // Reset form
  protected resetForm() {
    this.formGroup.reset();
  }

  // Handle submit form
  submit() {
    this.submitted = true;
    this.onValidate();

    if (this.formGroup === undefined || this.formGroup.invalid) {
      return;
    }

    this.onSubmit();
  }

  // On submit form
  protected abstract onSubmit();

  // Handle cancel
  cancel() {
    this.onCancel();
  }

  // On cancel form
  protected abstract onCancel();

  protected onCreateForm() {}

  validate() {
    if (!isNullOrEmptyOrUndefined(this.genericValidator)) {
      this.errorMessage = this.genericValidator.validate(this.formGroup);
    }
    this.onValidate();
  }

  // Call when submit event. User can overload method to implement business logic validation
  protected onValidate() {}

  protected finish() {
    if (this.isCreateAnother === true) {
      this.resetForm();
    } else {
      this.onCancel();
    }
  }

  ngOnInit() {
    this.onCreateForm();
  }

  // Register validate form in case status form change
  ngAfterViewInit() {
    const controlBlurs: Observable<any>[] = this.formControls.map(
      (formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur')
    );

    // Register handler when form group values changed. Wait 500ms then execute validate
    merge(this.formGroup.valueChanges, ...controlBlurs)
      .pipe(debounceTime(500))
      .subscribe(value => {
        this.validate();
      });
  }
}
