import { FormGroup } from '@angular/forms';
import { AbstractBaseComponent } from './abstract-base-component';
import { GenericValidator } from '../validation/generic-validator';

// Define common behavior for Form component
export abstract class AbstractFormComponent extends AbstractBaseComponent {
  formGroup: FormGroup;

  // a flag to be used in template to indicate whether the user tried to submit the form
  submitted = false;

  // Reset form
  resetForm() {
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

  // Call when submit event. User can overload method to implement business logic validation
  protected onValidate() {}
}
