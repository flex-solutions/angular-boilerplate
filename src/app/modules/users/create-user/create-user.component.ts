import { Component, OnInit, ViewChildren, ElementRef } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControlName
} from '@angular/forms';
import { GenericValidator } from '../../../shared/validation/generic-validator';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  @ViewChildren(FormControlName, { read: ElementRef })
  formControls: ElementRef[];

  userForm: FormGroup;
  errorMessage: { [key: string]: string } = {};
  genericValidator: GenericValidator;
  private validationMessages: { [key: string]: { [key: string]: string } } = {
    email: {
      required: 'Please provide email address.',
      pattern: 'Email address is invalid.'
    },
    fullname: {
      required: 'Please provide fullname.'
    },
    username: {
      required: 'Please provide username.'
    }
  };

  constructor(private fb: FormBuilder) {
    // Create an instance of the generic validator
    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit() {
    // Build user form
    this.userForm = this.fb.group({
      email: [
        null,
        [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+')]
      ],
      fullname: [null, [Validators.required]],
      username: [null, [Validators.required]]
    });
  }

  submit(): void {
    this.errorMessage = this.genericValidator.validate(this.userForm);
  }
}
