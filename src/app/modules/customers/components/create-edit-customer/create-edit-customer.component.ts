import { isEmpty } from 'ramda';
import { MemberTypeService } from '../../services/member-type.service';
import { MemberType } from '../../../../shared/models/member-type.model';
import { CustomerErrors } from '../../constants/customer.constants';
import { CustomerService } from '../../services/customer.service';
import { TranslateService } from '../../../../shared/services/translate.service';
import { NotificationService } from '../../../../shared/services/notification.service';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { CustomerModel } from '../../../../shared/models/customer.model';
import {
  Province,
  District,
  Country
} from '../../../../shared/models/address.model';
import { AbstractFormCreateMoreComponent } from '../../../../shared/abstract/abstract-form-create-more';
import {
  GenericValidator,
  IValidationMessage
} from '../../../../shared/validation/generic-validator';
import { isNullOrEmptyOrUndefine } from '../../../../utilities/util';
import { AddressComponent } from '../../../../shared/ui-common/address/address.component';

const TITLE_CREATE_CUSTOMER =
  'customer-create_edit_customer-h4-create_customer';
const DESCRIPTION_CREATE_CUSTOMER =
  'customer-create_edit_customer-h4-create_customer_description';
const TITLE_EDIT_CUSTOMER = 'customer-create_edit_customer-h4-edit_customer';
const DESCRIPTION_EDIT_CUSTOMER =
  'customer-create_edit_customer-h4-edit_customer_description';

@Component({
  moduleId: module.id,
  selector: 'app-create-edit-customer',
  templateUrl: './create-edit-customer.component.html'
})
export class CreateEditCustomerComponent extends AbstractFormCreateMoreComponent
  implements OnInit, AfterViewInit {
  isEdit = false;
  customer: CustomerModel = new CustomerModel();
  memberTypes: MemberType[] = [];
  selectedDistrict: District;
  selectedCity: Province;
  typeId = -1;
  customerId: string;
  cardTitle: string;
  cardDescription: string;
  femaleResource: string;
  maleResource: string;
  otherSexResource: string;
  @ViewChild('customerAddress') addressControl: AddressComponent;

  // Define validation message
  protected validationMessages: {
    [key: string]: { [key: string]: IValidationMessage };
  } = {
    email: {
      pattern: {
        message: CustomerErrors.EmailInvalid
      }
    }
  };

  constructor(
    private formBuilder: FormBuilder,
    private customerService: CustomerService,
    private memberTypeService: MemberTypeService,
    translateService: TranslateService,
    private notificationService: NotificationService,
    private activeRoute: ActivatedRoute,
    private location: Location
  ) {
    super(translateService);
  }

  ngOnInit() {
    this.activeRoute.params.subscribe((params: Params) => {
      this.customerId = params['id'] ? params['id'] : '';
      this.isEdit = params['id'] ? true : false;
      if (this.isEdit) {
        this.cardTitle = this.translateService.translate(TITLE_EDIT_CUSTOMER);
        this.cardDescription = this.translateService.translate(
          DESCRIPTION_EDIT_CUSTOMER
        );
      } else {
        this.cardTitle = this.translateService.translate(TITLE_CREATE_CUSTOMER);
        this.cardDescription = this.translateService.translate(
          DESCRIPTION_CREATE_CUSTOMER
        );
      }
    });

    // Create an instance of the generic validator
    this.genericValidator = new GenericValidator(
      this.validationMessages,
      this.translateService
    );

    this.onCreateForm();
    this.loadInformation();
  }

  ngAfterViewInit() {
    super.ngAfterViewInit();
    this.addressControl.reset();
  }

  async loadInformation() {
    await this.loadMemberTypes();
    this.loadCustomer();
  }

  private async loadMemberTypes() {
    this.memberTypes = await this.memberTypeService
      .getMemberTypes()
      .toPromise();
    if (!this.isEdit && !isEmpty(this.memberTypes)) {
      this.customer.customerType = this.memberTypes[0]._id;
    }
  }

  loadCustomer() {
    if (this.isEdit) {
      this.customerService
        .get(this.customerId)
        .subscribe((value: CustomerModel) => {
          if (value) {
            this.customer.clone(value as CustomerModel);
            if (
              this.customer &&
              this.customer.address &&
              this.customer.address.country &&
              this.customer.address.country.provinces.length > 0
            ) {
              if (
                !isNullOrEmptyOrUndefine(
                  this.customer.address.country.provinces[0].name
                )
              ) {
                // find selected id
                this.selectedCity = this.customer.address.country.provinces[0];
                if (
                  this.selectedCity &&
                  this.selectedCity.districts &&
                  this.selectedCity.districts.length > 0
                ) {
                  this.selectedDistrict = this.customer.address.country.provinces[0].districts[0];
                }
              }
            }
          } else {
            // Navigate to previous if user group not found.
            this.location.back();
          }
        });
    }
  }

  get name() {
    return this.formGroup.get('name');
  }

  get phone() {
    return this.formGroup.get('phone');
  }

  get sex() {
    return this.formGroup.get('sex');
  }

  get customerType() {
    return this.formGroup.get('customerType');
  }

  get address() {
    return this.formGroup.get('address');
  }

  get email() {
    return this.formGroup.get('email');
  }

  protected onCreateForm() {
    this.formGroup = this.formBuilder.group({
      name: ['', [Validators.required]],
      phone: [
        '+84',
        [Validators.required, Validators.pattern('\\+84[0-9]{9,10}')]
      ],
      birthday: ['', []],
      customerType: ['', []],
      sex: [this.customer.sex, []],
      address: ['', []],
      district: [this.selectedCity, []],
      city: [this.selectedCity, []],
      email: ['', [Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+')]],
      createAnother: ['', []]
    });
  }

  protected onSubmit() {
    if (!this.isEdit) {
      this.prepareCustomer();
      this.customerService.create(this.customer).subscribe(() => {
        // * Create news successful, display success notification
        const msg = this.getMessage(
          CustomerErrors.Create_Customer_Sucess,
          this.customer.name
        );
        this.notificationService.showSuccess(msg);
        this.refreshPageIfCreateAnother();
      });
    }
  }

  protected onValidate() {}

  protected onCancel() {
    this.location.back();
  }

  saveCustomer() {
    this.prepareCustomer();
    this.customerService.update(this.customer).subscribe(() => {
      // * Create news successful, display success notification
      const msg = this.getMessage(
        CustomerErrors.Edit_Customer_Sucess,
        this.customer.name
      );
      this.notificationService.showSuccess(msg);
      this.refreshPageIfCreateAnother();
    });
  }

  private prepareCustomer() {
    if (
      this.selectedCity != null &&
      !isNullOrEmptyOrUndefine(this.selectedCity.name)
    ) {
      this.customer.address.country = new Country();
      this.customer.address.country.provinces = [];
      const city = new Province();
      city.copyFrom(this.selectedCity);
      this.customer.address.country.provinces.push(city);
      this.customer.address.country.provinces[0].districts = [];
      this.customer.address.country.provinces[0].districts.push(
        this.selectedDistrict
      );
    }
  }

  protected refreshPageIfCreateAnother() {
    if (this.isCreateAnother) {
      this.resetSome();
      this.customer = new CustomerModel();
    } else {
      this.location.back();
    }
  }

  private resetSome() {
    this.formGroup.reset();
    this.formGroup.get('name').reset();
    this.formGroup.get('phone').reset();
    this.formGroup.get('createAnother').reset();
    this.formGroup.get('address').reset();
    this.formGroup.get('email').reset();
    this.addressControl.reset();
  }
}
