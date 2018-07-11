import { isNil } from 'ramda';
import { Pipe, PipeTransform } from '@angular/core';
import { Address } from '../models/address.model';

@Pipe({ name: 'address' })
export class AddressPipe implements PipeTransform {
  transform(value: Address) {
    if (isNil(value)) {
      return '--';
    } else {
      const addresses = [];
      addresses.push(value.address);

      if (
        !value.country ||
        !value.country.provinces ||
        value.country.provinces.length <= 0 ||
        (!value.country.provinces[0].districts ||
          value.country.provinces[0].districts.length <= 0)
      ) {
        return addresses.join(',');
      }

      addresses.push(value.country.provinces[0].districts[0].name);
      addresses.push(value.country.provinces[0].name);
      return addresses.join(', ');
    }
  }
}
