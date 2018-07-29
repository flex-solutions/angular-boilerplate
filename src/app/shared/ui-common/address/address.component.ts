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

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {
  private _district;
  private _cityProvince;

  // Get list select2 component
  @ViewChildren(Select2Component)
  select2Components: QueryList<Select2Component>;

  @Output() districtChange = new EventEmitter();
  @Output() cityProvinceChange = new EventEmitter();

  @Input()
  set cityProvince(val) {
    this._cityProvince = val;
    this.cityProvinceChange.emit(this._cityProvince);
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
      if ($event.districts) {
        this.districts = $event.districts;
      }
    }
  }

  reset() {
    this.districts = [];
    this.select2Components.forEach(i => i.reset());
  }
}
