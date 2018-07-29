import { CustomerService } from './../../services/customer.service';
import {
  Component,
  AfterViewInit,
  Input,
  Output,
  EventEmitter,
  QueryList,
  ViewChildren,
  ViewChild
} from '@angular/core';
import {
  CustomerFilter,
  Sex,
  sexResourceKey
} from '../../../../shared/models/customer.model';
import { Select2Component } from '../../../../shared/ui-common/select2/select2.component';
import { MemberTypeService } from '../../services/member-type.service';
import { TranslateService } from '../../../../shared/services/translate.service';
import { MemberType } from '../../../../shared/models/member-type.model';
import { CustomerData } from '../../services/customer-filter.data';
import { AddressComponent } from '../../../../shared/ui-common/address/address.component';

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

  @ViewChild('filterAddress') addressControl: AddressComponent;

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

  getSexes() {
    return [
      {
        id: Sex.Female,
        text: this.translateService.translate(sexResourceKey.Female)
      },
      {
        id: Sex.Male,
        text: this.translateService.translate(sexResourceKey.Male)
      },
      {
        id: Sex.Other,
        text: this.translateService.translate(sexResourceKey.Other)
      }
    ];
  }

  loadData() {
    this.memberTypeService.getMemberTypes().subscribe((data: MemberType[]) => {
      this.memberTypes = data.map(m => {
        m['id'] = m.code;
        m['text'] = m.name;
        return m;
      });
    });

    this.months = CustomerData.months;

    this.sexes = this.getSexes();
  }

  runFilter() {
    this.runFilterClicked.emit();
  }

  resetFilter() {
    this.customerFilter = new CustomerFilter();
    this.select2Components.forEach(i => i.reset());
    this.addressControl.reset();
    this.resetFunction();
  }
}
