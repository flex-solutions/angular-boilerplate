import { Component, QueryList, ViewChildren, ViewChild } from '@angular/core';
import {
  MemberFilter,
  Sex,
  sexResourceKey
} from '../../../../shared/models/member.model';
import { Select2Component } from '../../../../shared/ui-common/select2/select2.component';
import { MembershipTypeService } from '../../services/membership-type.service';
import { TranslateService } from '../../../../shared/services/translate.service';
import { MembershipType } from '../../../../shared/models/membership-type.model';
import { MemberData } from '../../services/member-filter.data';
import { AddressComponent } from '../../../../shared/ui-common/address/address.component';
import { AbstractFilterComponent } from '../../../../shared/abstract/abstract-filter.component';

@Component({
  selector: 'app-member-filter',
  templateUrl: './member-filter.component.html',
  styleUrls: ['./member-filter.component.css']
})
export class MemberFilterComponent extends AbstractFilterComponent<MemberFilter> {
  // Get list select2 component
  @ViewChildren(Select2Component)
  select2Components: QueryList<Select2Component>;

  @ViewChild('filterAddress') addressControl: AddressComponent;

  membershipTypes: any[];
  provinces: any[];
  districts: any[];
  months: any[];
  sexes: any[];

  constructor(
    private readonly membershipTypeService: MembershipTypeService,
    private readonly translateService: TranslateService
  ) {
    super();
    this.filter = new MemberFilter();
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
    this.membershipTypeService.getMembershipTypes().subscribe((data: MembershipType[]) => {
      this.membershipTypes = data.map(m => {
        m['id'] = m._id;
        m['text'] = m.name;
        return m;
      });
    });

    this.months = MemberData.months;

    this.sexes = this.getSexes();
  }

  onResetFilter() {
    this.filter = new MemberFilter();
    this.select2Components.forEach(i => i.reset());
    this.addressControl.reset();
  }
}
