import { CustomerErrors } from './../../constants/customer.constants';
import { CustomerService } from './../../services/customer.service';
import { TranslateService } from './../../../../shared/services/translate.service';
import { NotificationService } from './../../../../shared/services/notification.service';
import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AbstractFormComponent } from '../../../../shared/abstract/abstract-form-component';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { isNullOrUndefined } from 'util';
import { CustomerModel, Sex } from '../../../../shared/models/customer.model';

const TITLE_CREATE_CUSTOMER: string = 'customer-create_edit_customer-h4-create_customer';
const DESCRIPTION_CREATE_CUSTOMER: string = 'customer-create_edit_customer-h4-create_customer_description';
const TITLE_EDIT_CUSTOMER: string = 'customer-create_edit_customer-h4-edit_customer';
const DESCRIPTION_EDIT_CUSTOMER: string = 'customer-create_edit_customer-h4-edit_customer_description';

@Component({
  moduleId: module.id,
  selector: 'app-create-edit-customer',
  templateUrl: './create-edit-customer.component.html'
})
export class CreateEditCustomerComponent extends AbstractFormComponent {
  isEdit: boolean = false;
  isCreateAnother: boolean = false;

  customer: CustomerModel = new CustomerModel();
  sexes: Sex[] = [];
  types: number[] = [];
  sexId = -1;
  typeId = -1;
  customerId: string;
  cardTitle: string;
  cardDescription: string;

  constructor(
    private formbuilder: FormBuilder,
    private customerService: CustomerService,
    private translateService: TranslateService,
    private notificationService: NotificationService,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {
    super();
  }

  ngOnInit() {
    this.activeRoute.params.subscribe((params: Params) => {
      this.customerId = params['id'] ? params['id'] : '';
      this.isEdit = params['id'] ? true : false;
      if (this.isEdit) {
        this.cardTitle = this.translateService.translate(TITLE_EDIT_CUSTOMER);
        this.cardDescription = this.translateService.translate(DESCRIPTION_EDIT_CUSTOMER);
      } else {
        this.cardTitle = this.translateService.translate(TITLE_CREATE_CUSTOMER);
        this.cardDescription = this.translateService.translate(DESCRIPTION_CREATE_CUSTOMER);
      }
    });
    this.onCreateForm();
  }

  LoadNews() {
    if (this.isEdit) {
      this.customerService.get(this.customerId).subscribe(
        (value: CustomerModel) => {
          if (value) {
            this.customer = value as CustomerModel;
          } else {
            // Navigate to previous if user group not found
            this.location.back();
          }
        }
      );
    }
  }

  get name() {
    return this.formGroup.get('name');
  }

  get phone() {
    return this.formGroup.get('phone');
  }

  get birthday() {
    return this.formGroup.get('birthday');
  }

  get sex() {
    return this.formGroup.get('sex');
  }

  get address() {
    return this.formGroup.get('address');
  }

  get district() {
    return this.formGroup.get('district');
  }

  get city() {
    return this.formGroup.get('city');
  }

  get email() {
    return this.formGroup.get('email');
  }

  get createAnother() {
    return this.formGroup.get('createAnother');
  }

  protected onCreateForm() {
    this.formGroup = this.formbuilder.group({
      name: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      birthday: ['', []],
      sex: ['', []],
      address: ['', []],
      district: ['', []],
      city: ['', []],
      email: ['', []],
      createAnother: ['', []]
    });
  }

  protected onSubmit() {
    if (!this.isEdit) {
      this.customerService.create(this.customer).subscribe(
        (value: CustomerModel) => {
          // * Create news successful, display success notification
          const msg = this.getMessage(
            CustomerErrors.Create_Customer_Sucess,
            this.customer.name
          );
          this.notificationService.showSuccess(msg);
        }
      );
    }
  }

  protected onCancel() {
    this.location.back();
  }

  saveNews() {
    this.customerService.update(this.customer).subscribe(
      (value: CustomerModel) => {
        // * Create news successful, display success notification
        const msg = this.getMessage(
          CustomerErrors.Edit_Customer_Sucess,
          this.customer.name
        );
        this.notificationService.showSuccess(msg);
      }
    );
  }

  protected getMessage(key: string, ...params) {
    if (params.length) {
      return this.translateService.translateWithParams(key, params);
    }
    return this.translateService.translate(key);
  }
}
