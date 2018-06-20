import { Directive, forwardRef, Attribute } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';
@Directive({
  selector: '[appNotEqualValidator]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => NotEqualValidator), multi: true }
  ]
})
export class NotEqualValidator implements Validator {
  constructor(@Attribute('appNotEqualValidator') public notValidateEqual: string,
  @Attribute('notEqualReverse') public notEqualReverse: string) {
  }

  private get isReverse() {
      if (!this.notEqualReverse) { return false; }
      return this.notEqualReverse === 'true' ? true : false;
  }

  validate(c: AbstractControl): { [key: string]: any } {
      // self value
      const v = c.value;

      // control vlaue
      const e = c.root.get(this.notValidateEqual);

      // value equal
      if (e && v === e.value && !this.isReverse) {
          return {
            notValidateEqual: false
          };
      }

      // value not equal and reverse
      if (e && v !== e.value && this.isReverse && e.errors) {
          delete e.errors['notValidateEqual'];
          if (!Object.keys(e.errors).length) { e.setErrors(null); }
      }

      // value equal and reverse
      if (e && v === e.value && this.isReverse) {
          e.setErrors({ notValidateEqual: false });
      }

      return null;
  }
}
