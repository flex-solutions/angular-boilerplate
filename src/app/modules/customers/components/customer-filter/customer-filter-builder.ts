import {
  CriteriaBuilder,
  FilterType
} from '../../../../utilities/search-filter';
import { CustomerFilter } from '../../../../shared/models/customer.model';
import { isNullOrEmptyOrUndefine } from '../../../../utilities/util';

export class CustomerCriteriaBuilder {
  static build(customerFilter: CustomerFilter) {
    // Start criteria with and operator
    const builder = CriteriaBuilder.makeCriteria().setFilter(FilterType.And);

    Object.keys(customerFilter).forEach(property => {
      const propertyValue = customerFilter[property];
      if (isNullOrEmptyOrUndefine(propertyValue)) {
        return;
      }
      if (propertyValue.hasOwnProperty('id')) {
        // In case value is select table type
        builder.withFilter(
          FilterType.Regex,
          property,
          customerFilter[property].id
        );
      } else {
        builder.withFilter(
          FilterType.Regex,
          property,
          customerFilter[property]
        );
      }
    });

    return builder.build();
  }
}
