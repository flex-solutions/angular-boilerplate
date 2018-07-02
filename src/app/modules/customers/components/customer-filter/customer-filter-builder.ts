import { CriteriaBuilder, FilterType } from '../../../../utilities/search-filter';

export class CustomerCriteriaBuilder {
  static build() {
    return CriteriaBuilder.makeCriteria()
      .setFilter(FilterType.And)
      .withFilter(FilterType.Regex, 'phone_number', '01289')
      .withFilter(FilterType.Regex, 'name', '012sdad')
      .build();
  }
}
