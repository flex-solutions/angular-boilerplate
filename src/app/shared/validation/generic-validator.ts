import { TranslateService } from './../services/translate.service';
import { FormGroup } from '@angular/forms';

// Generic validator for Reactive forms
// Implemented as a class, not a service, so it can retain state for multiple forms.
export class GenericValidator {
  // Provide the set of valid validation messages
  // Stucture:
  // controlName1: {
  //     validationRuleName1: IValidationMessage,
  //     validationRuleName2: IValidationMessage
  // },
  // controlName2: {
  //     validationRuleName1: IValidationMessage,
  //     validationRuleName2: IValidationMessage
  // }
  constructor(
    private validationMessages: {
      [key: string]: { [key: string]: IValidationMessage };
    },
    private translateService: TranslateService
  ) {}

  // Processes each control within a FormGroup
  // And returns a set of validation messages to display
  // Structure
  // controlName1: 'Validation Message.',
  // controlName2: 'Validation Message.'
  validate(container: FormGroup): { [key: string]: string } {
    const messages = {};
    for (const controlKey in container.controls) {
      if (container.controls.hasOwnProperty(controlKey)) {
        const c = container.controls[controlKey];
        // If it is a FormGroup, process its child controls.
        if (c instanceof FormGroup) {
          const childMessages = this.validate(c);
          Object.assign(messages, childMessages);
        } else {
          // Only validate if there are validation messages for the control
          if (this.validationMessages[controlKey]) {
            messages[controlKey] = '';
            if (c.invalid && c.errors) {
              for (const messageKey in c.errors) {
                if (
                  c.errors.hasOwnProperty(messageKey) &&
                  this.validationMessages[controlKey][messageKey]
                ) {
                  const validationMsg = this.validationMessages[controlKey][
                    messageKey
                  ];
                  if (this.translateService) {
                    // Need to resolve multilingual value
                    const message = this.resolveMultilingual(validationMsg);
                    messages[controlKey] += message;
                  } else {
                    // Multilingual resolver haven't yet
                    messages[controlKey] += validationMsg.message;
                  }
                }
              }
            }
          }
        }
      }
    }
    return messages;
  }

  // Using translate service to resolve multilingual value with specific params or dynamic params by params callback handler
  resolveMultilingual(validationMsg: IValidationMessage): string {
    // Have specific params
    if (validationMsg.params) {
      return this.translateService.translateWithParams(
        validationMsg.message,
        validationMsg.params
      );
    } else if (validationMsg.paramsCallback) {
      // Using callback to get params at run-time
      const params = validationMsg.paramsCallback();
      return this.translateService.translateWithParams(
        validationMsg.message,
        params
      );
    }

    // No params
    return this.translateService.translate(validationMsg.message);
  }
}
export interface IValidationMessage {
  message: string;
  params?: string[];
  paramsCallback?: () => string[];
}
