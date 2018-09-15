import { FilterType, CriteriaBuilder } from '../../../../utilities/search-filter';
import { VoucherFilter, voucherFilterFields } from '../../../../shared/models/voucher.model';


export class VoucherCriteriaBuilder {
  static build(voucherFilter: VoucherFilter) {
    // Start criteria with and operator
    const builder = CriteriaBuilder.makeCriteria().startWrapperFilter(
      FilterType.And
    );

    // In case value is select table type
    builder
      .withFilter(
        FilterType.Regex,
        voucherFilterFields.NAME,
        voucherFilter[voucherFilterFields.NAME]
      )
      .withFilter(
        FilterType.Regex,
        voucherFilterFields.CREATE_ON,
        voucherFilter[voucherFilterFields.CREATE_ON]
      );

      return builder.endWrapperFilter().build();
  }
}
