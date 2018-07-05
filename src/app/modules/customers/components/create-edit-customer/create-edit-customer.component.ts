import { customerModuleDirectives } from './../../directives/index';
import { AddressService } from './../../services/address.service';
import { CustomerErrors } from './../../constants/customer.constants';
import { CustomerService } from './../../services/customer.service';
import { TranslateService } from './../../../../shared/services/translate.service';
import { NotificationService } from './../../../../shared/services/notification.service';
import { Component, Directive } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { CustomerModel, CustomerTypeModel } from '../../../../shared/models/customer.model';
import { CityModel, DistrictModel, CountryModel } from '../../../../shared/models/district.model';
import { AbstractFormCreateMoreComponent } from '../../../../shared/abstract/abstract-form-create-more';
import { GenericValidator, IValidationMessage } from '../../../../shared/validation/generic-validator';


const TITLE_CREATE_CUSTOMER: string = 'customer-create_edit_customer-h4-create_customer';
const DESCRIPTION_CREATE_CUSTOMER: string = 'customer-create_edit_customer-h4-create_customer_description';
const TITLE_EDIT_CUSTOMER: string = 'customer-create_edit_customer-h4-edit_customer';
const DESCRIPTION_EDIT_CUSTOMER: string = 'customer-create_edit_customer-h4-edit_customer_description';

@Component({
  moduleId: module.id,
  selector: 'app-create-edit-customer',
  templateUrl: './create-edit-customer.component.html',
})
export class CreateEditCustomerComponent extends AbstractFormCreateMoreComponent {
  isEdit: boolean = false;
  customer: CustomerModel = new CustomerModel();
  memberTypes: CustomerTypeModel[] = [];
  selectedDistrict: DistrictModel = new DistrictModel();
  selectedCity: CityModel = new CityModel();
  cities: CityModel[] = [];
  typeId = -1;
  customerId: string;
  cardTitle: string;
  cardDescription: string;
  femaleResource: string;
  maleResource: string;
  otherSexResource: string;

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
    this.loadInformation();
    this.loadCustomer();
  }

  loadInformation() {
    if (this.cities.length === 0) {
      this.cities = this.addressService.getCities().provinces;
      this.resetInformation();
      this.loadCustomer();
    }

  }

  private resetInformation() {
    if (!this.isEdit && this.cities && this.cities.length > 0) {
      this.selectedCity = this.cities[0];
      this.selectedDistrict = this.selectedCity.districts[0];
    }
  }
  
  loadCustomer() {
    if (this.isEdit) {
      this.customerService.get(this.customerId).subscribe(
        (value: CustomerModel) => {
          if (value) {
            this.customer = value as CustomerModel;
            // find selected id
            var selectedCityId = this.customer.address.country.provinces[0]._id;
            this.selectedCity = this.cities.find(citi => citi._id == selectedCityId);
            var selectedDistrictId = this.customer.address.country.provinces[0].districts[0]._id;
            this.selectedDistrict = this.selectedCity.districts.find(
                                        district => district._id == selectedDistrictId);
          } else {
            // Navigate to previous if user group not found.
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
      phone: ['+84 ', [Validators.required, Validators.pattern('\\+84 [0-9]{9,10}')]],
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
      this.customerService.create(this.customer).subscribe(
        (value: CustomerModel) => {
          // * Create news successful, display success notification
          const msg = this.getMessage(
            CustomerErrors.Create_Customer_Sucess,
            this.customer.name
          );
          this.notificationService.showSuccess(msg);
          this.refreshPageIfCreateAnother();
        }
      );
    }
  }

  protected onValidate() { }

  protected onCancel() {
    this.location.back();
  }

  saveCustomer() {
    this.prepareCustomer();
    this.customerService.update(this.customer).subscribe(
      (value: CustomerModel) => {
        // * Create news successful, display success notification
        const msg = this.getMessage(
          CustomerErrors.Edit_Customer_Sucess,
          this.customer.name
        );
        this.notificationService.showSuccess(msg);
        this.refreshPageIfCreateAnother();
      }
    );
    
  }

  onCityChange(event) {
    this.selectedCity = event;
    if (this.selectedCity && this.selectedCity.districts && this.selectedCity.districts.length > 0) {
      this.selectedDistrict = this.selectedCity.districts[0];
    }
  }

  private prepareCustomer() {
    this.customer.address.country = new CountryModel();
    this.customer.address.country.provinces = [];
    var city = new CityModel();
    city.clone(this.selectedCity);
    this.customer.address.country.provinces.push(city);
    this.customer.address.country.provinces[0].districts = [];
    this.customer.address.country.provinces[0].districts.push(this.selectedDistrict);
  }

  protected refreshPageIfCreateAnother() {
    if (this.isCreateAnother) {
      this.resetSome();
      this.customer = new CustomerModel();
      this.resetInformation();
    } else {
      this.location.back();
    }
  }

  private resetSome() {
    this.formGroup.get('name').reset();
    this.formGroup.get('phone').reset();
    this.formGroup.get('createAnother').reset();
    this.formGroup.get('address').reset();
    this.formGroup.get('email').reset();
  }
}
