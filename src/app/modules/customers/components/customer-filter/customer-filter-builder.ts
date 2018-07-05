import {
  CriteriaBuilder,
  FilterType
} from '../../../../utilities/search-filter';
import {
  CustomerFilter,
  customerFilterFields
} from '../../../../shared/models/customer.model';

export class CustomerCriteriaBuilder {
  static build(customerFilter: CustomerFilter) {
    // Start criteria with and operator
    const builder = CriteriaBuilder.makeCriteria().setFilter(FilterType.And);

    // In case value is select table type
    builder
      .withFilter(
        FilterType.Regex,
        customerFilterFields.PHONE_NUMBER,
        customerFilter[customerFilterFields.PHONE_NUMBER]
      )
      .withFilter(
        FilterType.Regex,
        customerFilterFields.MEMBER_ID,
        customerFilter[customerFilterFields.MEMBER_ID]
      )
      .withFilter(
        FilterType.Regex,
        customerFilterFields.NAME,
        customerFilter[customerFilterFields.NAME]
      )
      .withFilter(
        FilterType.Equal,
        customerFilterFields.SEX,
        customerFilter[customerFilterFields.SEX].id
      );
      // .withFilter(
      //   FilterType.Regex,
      //   customerFilterFields.MONTH_OF_BIRTHDAY,
      //   customerFilter[customerFilterFields.MONTH_OF_BIRTHDAY]
      // );

    return builder.build();
  }
}
