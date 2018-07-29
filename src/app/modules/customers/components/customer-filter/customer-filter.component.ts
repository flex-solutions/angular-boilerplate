import {
  Component,
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
import { AbstractFilterComponent } from '../../../../shared/abstract/abstract-filter.component';

@Component({
  selector: 'app-customer-filter',
  templateUrl: './customer-filter.component.html',
  styleUrls: ['./customer-filter.component.css']
})
export class CustomerFilterComponent extends AbstractFilterComponent<CustomerFilter> {
  // Get list select2 component
  @ViewChildren(Select2Component)
  select2Components: QueryList<Select2Component>;

  @ViewChild('filterAddress') addressControl: AddressComponent;

  memberTypes: any[];
  provinces: any[];
  districts: any[];
  months: any[];
  sexes: any[];

  constructor(
    private readonly memberTypeService: MemberTypeService,
    private readonly translateService: TranslateService
  ) {
    super();
    this.filter = new CustomerFilter();
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

  onResetFilter() {
    this.filter = new CustomerFilter();
    this.select2Components.forEach(i => i.reset());
    this.addressControl.reset();
  }
}
