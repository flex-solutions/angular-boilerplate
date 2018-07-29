import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChildren,
  QueryList
} from '@angular/core';
import { Province, District } from '../../models/address.model';
import { AddressService } from './address.service';
import { Select2Component } from '../select2/select2.component';
import { isNullOrEmptyOrUndefine } from '../../../utilities/util';
import { R } from 'ramda';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {
  private _district: District;
  private _cityProvince: Province;

  // Get list select2 component
  @ViewChildren(Select2Component)
  select2Components: QueryList<Select2Component>;

  @Output() districtChange = new EventEmitter();
  @Output() cityProvinceChange = new EventEmitter();

  @Input()
  set cityProvince(val) {
    this._cityProvince = val;
    this.cityProvinceChange.emit(this._cityProvince);
    if (this._cityProvince && this._cityProvince.districts) {
      this.onProvinceChange(this._cityProvince);
    }
  }

  get cityProvince() {
    return this._cityProvince;
  }

  @Input()
  set district(val) {
    this._district = val;
    this.districtChange.emit(this._district);
  }

  get district() {
    return this._district;
  }

  provinces: Province[] = [];
  districts: District[] = [];

  constructor(private readonly addressService: AddressService) {}

  ngOnInit() {
    this.addressService.getCityProvinces().then(provinces => {
      this.provinces = provinces;
    });
  }

  onProvinceChange($event) {
    if ($event) {
      if (!this.isNullOrEmptyDistricts($event.districts)) {
        this.districts = $event.districts;
      } else {
        this.addressService.getDistricts($event.code).then(val => {
          this.districts = val;
        });
      }
    }
  }

  isNullOrEmptyDistricts(districts: District[]) {
    if (isNullOrEmptyOrUndefine(districts)) {
      return true;
    }

    if (!districts[0].code || !districts[0].name) {
      return true;
    }

    return false;
  }

  reset() {
    this.districts = [];
    this.select2Components.forEach(i => i.reset());
  }
}
