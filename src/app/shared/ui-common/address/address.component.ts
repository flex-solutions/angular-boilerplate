import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild
} from '@angular/core';
import { Province, District } from '../../models/address.model';
import { AddressService } from './address.service';
import { Select2Component } from '../select2/select2.component';
import { isNullOrEmptyOrUndefine } from '../../../utilities/util';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {
  private _district: District;
  private _cityProvince: Province;

  // Get list select2 component
  @ViewChild('districtSelect') districtSelectControl: Select2Component;
  @ViewChild('provinceSelect') provinceSelectControl: Select2Component;

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

  private _districts: District[] = [];
  get districts() {
    return this._districts;
  }

  set districts(val) {
    this._districts = val;
  }

  constructor(private readonly addressService: AddressService) {}

  ngOnInit() {
    this.addressService.getCityProvinces().then(provinces => {
      this.provinces = provinces;
    });
  }

  onProvinceChange($event) {
    if ($event) {
      this.addressService.getDistricts($event.code).then(val => {
        this.districts = val;
      });
    }
  }

  reset() {
    this.districts = [];
    this.districtSelectControl.reset();
    this.provinceSelectControl.reset();
  }
}
