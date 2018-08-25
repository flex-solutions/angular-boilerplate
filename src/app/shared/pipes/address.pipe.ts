import { isNil } from 'ramda';
import { Pipe, PipeTransform } from '@angular/core';
import { Address } from '../models/address.model';
import { isNullOrEmptyOrUndefined } from '../../utilities/util';

@Pipe({ name: 'address' })
export class AddressPipe implements PipeTransform {
  transform(value: Address) {
    if (isNil(value)) {
      return '--';
    } else {
      const addresses = [];
      addresses.push(value.address);

      if (
        isNullOrEmptyOrUndefined(value.country) ||
        isNullOrEmptyOrUndefined(value.country.provinces)
      ) {
        return addresses.join(',');
      }

      const provinces = value.country.provinces as any;
      if (Array.isArray(provinces)) {
        addresses.push(value.country.provinces[0].districts[0].name);
        addresses.push(value.country.provinces[0].name);
      } else {
        addresses.push(provinces.districts.name);
        addresses.push(provinces.name);
      }

      return addresses.join(', ');
    }
  }
}
