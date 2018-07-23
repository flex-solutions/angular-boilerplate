import { AddressService } from './../../services/address.service';
import { CustomerService } from './../../services/customer.service';
import {
  Component,
  AfterViewInit,
  Input,
  Output,
  EventEmitter,
  QueryList,
  ViewChildren
} from '@angular/core';
import { CustomerFilter, Sex } from '../../../../shared/models/customer.model';
import { Select2Component } from '../../../../shared/ui-common/select2/select2.component';
import { isNullOrEmptyOrUndefine } from '../../../../utilities/util';
import { MemberTypeService } from '../../services/member-type.service';
import { TranslateService } from '../../../../shared/services/translate.service';
import { MemberType } from '../../../../shared/models/member-type.model';

@Component({
  selector: 'app-customer-filter',
  templateUrl: './customer-filter.component.html',
  styleUrls: ['./customer-filter.component.css']
})
export class CustomerFilterComponent implements AfterViewInit {
  private _customerFilter: CustomerFilter;
  private _resetFunction: () => void;

  // Get list select2 component
  @ViewChildren(Select2Component)
  select2Components: QueryList<Select2Component>;

  // Call when custom filter change
  @Output() customerFilterChange = new EventEmitter();

  // Call when button run filter have clicked
  @Output() runFilterClicked = new EventEmitter();

  // Get and set customer filter property
  @Input()
  set customerFilter(value) {
    this._customerFilter = value;
    this.customerFilterChange.emit(this._customerFilter);
  }

  get customerFilter() {
    return this._customerFilter;
  }

  // Get and set reset callback function
  @Input()
  get resetFunction() {
    return this._resetFunction;
  }

  set resetFunction(v: any) {
    this._resetFunction = v;
  }

  memberTypes: any[];
  provinces: any[];
  districts: any[];
  months: any[];
  sexes: any[];

  constructor(
    private readonly customerService: CustomerService,
    private readonly addressService: AddressService,
    private readonly memberTypeService: MemberTypeService,
    private readonly translateService: TranslateService
  ) {
    this.customerFilter = new CustomerFilter();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.loadData();
    });
  }

  onProvinceChange($event) {
    if ($event) {
      if ($event.districts) {
        this.districts = $event.districts.filter(
          d => !isNullOrEmptyOrUndefine(d.name)
        );
      }
    }
  }

  getSexes() {
    return [
      {
        id: Sex.Female,
        text: this.translateService.translate('sex-woman')
      },
      {
        id: Sex.Male,
        text: this.translateService.translate('sex-man')
      },
      {
        id: Sex.Other,
        text: this.translateService.translate('sex-other')
      }
    ];
  }

  loadData() {
    const self = this;
    this.memberTypeService.getMemberTypes().subscribe((data: MemberType[]) => {
      this.memberTypes = data.map(m => {
        m['id'] = m.code;
        m['text'] = m.name;
        return m;
      });
    });

    this.customerService.getMonthBirthday().then((data: any[]) => {
      self.months = data;
    });

    this.addressService.getCountry().then(country => {
      self.provinces = country.provinces.filter(
        p => !isNullOrEmptyOrUndefine(p.name)
      );
      if (this.provinces && this.provinces.length > 0) {
        self.districts = this.provinces[0].districts.filter(
          d => !isNullOrEmptyOrUndefine(d.name)
        );
      }
    });
    this.sexes = this.getSexes();
  }

  runFilter() {
    this.runFilterClicked.emit();
  }

  resetFilter() {
    this.customerFilter = new CustomerFilter();
    this.select2Components.forEach(i => i.reset());
    this.resetFunction();
  }
}
