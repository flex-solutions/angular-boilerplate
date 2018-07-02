import { AddressService } from './../../services/address.service';
import { CustomerErrors } from './../../constants/customer.constants';
import { CustomerService } from './../../services/customer.service';
import { TranslateService } from './../../../../shared/services/translate.service';
import { NotificationService } from './../../../../shared/services/notification.service';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { CustomerModel, SexList, SexModel, CustomerTypeModel } from '../../../../shared/models/customer.model';
import { CityModel, DistrictModel, CountryModel } from '../../../../shared/models/district.model';
import { AbstractFormCreateMoreComponent } from '../../../../shared/abstract/abstract-form-create-more';
import { GenericValidator, IValidationMessage } from '../../../../shared/validation/generic-validator';
import { generateRandomNumber } from '../../../../utilities/generate-unique-random';

const TITLE_CREATE_CUSTOMER: string = 'customer-create_edit_customer-h4-create_customer';
const DESCRIPTION_CREATE_CUSTOMER: string = 'customer-create_edit_customer-h4-create_customer_description';
const TITLE_EDIT_CUSTOMER: string = 'customer-create_edit_customer-h4-edit_customer';
const DESCRIPTION_EDIT_CUSTOMER: string = 'customer-create_edit_customer-h4-edit_customer_description';

@Component({
  moduleId: module.id,
  selector: 'app-create-edit-customer',
  templateUrl: './create-edit-customer.component.html'
})
export class CreateEditCustomerComponent extends AbstractFormCreateMoreComponent {
  isEdit: boolean = false;
  customer: CustomerModel = new CustomerModel();
  sexes: SexModel[] = SexList.getInstance(this.translateService);
  types: CustomerTypeModel[] = [];
  selectedDistrict: DistrictModel = new DistrictModel();
  selectedCity: CityModel = new CityModel();
  cities: CityModel[] = [];
  country: CountryModel = new CountryModel();
  typeId = -1;
  customerId: string;
  cardTitle: string;
  cardDescription: string;

  // Define validation message
  protected validationMessages: {
    [key: string]: { [key: string]: IValidationMessage };
  } = {
    };

  constructor(
    private formbuilder: FormBuilder,
    private customerService: CustomerService,
    private addressService: AddressService,
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
        this.cardDescription = this.translateService.translate(DESCRIPTION_EDIT_CUSTOMER);
      } else {
        this.cardTitle = this.translateService.translate(TITLE_CREATE_CUSTOMER);
        this.cardDescription = this.translateService.translate(DESCRIPTION_CREATE_CUSTOMER);
      }
    });

    // Create an instance of the generic validator
    this.genericValidator = new GenericValidator(
      this.validationMessages,
      this.translateService
    );

    this.onCreateForm();
    this.LoadCity();
    this.LoadCustomer();
  }

  LoadCity() {
    this.addressService.getCities().subscribe((result: CountryModel) => {
      this.country = result;
      this.cities = result.provinces;
      if (!this.isEdit) {
        this.selectedCity = this.cities[0];
        this.selectedDistrict = this.selectedCity.districts[0];
      }
    });
  }

  LoadCustomer() {
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

  get sex() {
    return this.formGroup.get('sex');
  }

  get customerType() {
    return this.formGroup.get('customerType');
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

  protected onCreateForm() {
    this.formGroup = this.formbuilder.group({
      name: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      birthday: ['', []],
      customerType: ['', []],
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
      this.customer.address.country = this.country;
      this.customer.address.country.provinces = [];
      this.customer.address.country.provinces.push(this.selectedCity);
      this.customer.address.country.provinces[0].districts = [];
      this.customer.address.country.provinces[0].districts.push(this.selectedDistrict);
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

  protected onValidate() { }

  protected onCancel() {
    this.location.back();
  }

  saveCustomer() {
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

  onCityChange(event) {
    this.selectedCity = event;
    this.selectedDistrict = this.selectedCity.districts[0];
   }
}
