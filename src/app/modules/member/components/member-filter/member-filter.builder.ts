import {
  CriteriaBuilder,
  FilterType,
  ValueType
} from '../../../../utilities/search-filter';
import {
  MemberFilter,
  memberFilterFields
} from '../../../../shared/models/member.model';

export class MemberCriteriaBuilder {
  static build(memberFilter: MemberFilter) {
    // Start criteria with and operator
    const builder = CriteriaBuilder.makeCriteria().startWrapperFilter(
      FilterType.And
    );

    // In case value is select table type
    builder
      .withFilter(
        FilterType.Regex,
        memberFilterFields.PHONE_NUMBER,
        memberFilter[memberFilterFields.PHONE_NUMBER]
      )
      .withFilter(
        FilterType.Regex,
        memberFilterFields.MEMBER_ID,
        memberFilter[memberFilterFields.MEMBER_ID]
      )
      .withFilter(
        FilterType.Regex,
        memberFilterFields.NAME,
        memberFilter[memberFilterFields.NAME]
      )
      .withFilter(
        FilterType.Equal,
        memberFilterFields.SEX,
        memberFilter[memberFilterFields.SEX].id,
        ValueType.Number
      )
      .withFilter(
        FilterType.Equal,
        memberFilterFields.MONTH_OF_BIRTHDAY,
        memberFilter[memberFilterFields.MONTH_OF_BIRTHDAY].id,
        ValueType.Number
      )
      .withFilter(
        FilterType.Regex,
        memberFilterFields.PROVINCE,
        memberFilter[memberFilterFields.PROVINCE].name
      )
      .withFilter(
        FilterType.Regex,
        memberFilterFields.DISTRICT,
        memberFilter[memberFilterFields.DISTRICT].name
      );

    return builder.endWrapperFilter().build();
  }
}
