import {
  CriteriaBuilder,
  FilterType,
  ValueType
} from '../../../../utilities/search-filter';
import {
  CustomerFilter,
  customerFilterFields
} from '../../../../shared/models/customer.model';

export class CustomerCriteriaBuilder {
  static build(customerFilter: CustomerFilter) {
    // Start criteria with and operator
    const builder = CriteriaBuilder.makeCriteria().startWrapperFilter(
      FilterType.And
    );

    // In case value is select table type
    builder
      .withFilter(
        FilterType.Regex,
        customerFilterFields.PHONE_NUMBER,
        customerFilter[customerFilterFields.PHONE_NUMBER],
        ValueType.RegexContains
      )
      .withFilter(
        FilterType.Regex,
        customerFilterFields.MEMBER_ID,
        customerFilter[customerFilterFields.MEMBER_ID],
        ValueType.RegexContains
      )
      .withFilter(
        FilterType.Regex,
        customerFilterFields.NAME,
        customerFilter[customerFilterFields.NAME],
        ValueType.RegexContains
      )
      .withFilter(
        FilterType.Equal,
        customerFilterFields.SEX,
        customerFilter[customerFilterFields.SEX].id,
        ValueType.Number
      )
      .withFilter(
        FilterType.Equal,
        customerFilterFields.MONTH_OF_BIRTHDAY,
        customerFilter[customerFilterFields.MONTH_OF_BIRTHDAY].id,
        ValueType.Number
      )
      .withFilter(
        FilterType.default,
        customerFilterFields.CUSTOMER_TYPE,
        customerFilter.customerType.id,
        ValueType.ObjectId
      );

    return builder.endWrapperFilter().build();
  }
}
