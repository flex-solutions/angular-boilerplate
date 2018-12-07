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
        memberFilter[memberFilterFields.PHONE_NUMBER],
        ValueType.RegexContains
      )
      .withFilter(
        FilterType.Regex,
        memberFilterFields.MEMBER_ID,
        memberFilter[memberFilterFields.MEMBER_ID],
        ValueType.RegexContains
      )
      .withFilter(
        FilterType.Regex,
        memberFilterFields.NAME,
        memberFilter[memberFilterFields.NAME],
        ValueType.RegexContains
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
        FilterType.Default,
        memberFilterFields.MEMBERSHIP_TYPE,
        memberFilter.membershipType.id,
        ValueType.ObjectId
      )
      .withFilter(
        FilterType.Equal,
        memberFilterFields.PROVINCE,
        memberFilter[memberFilterFields.PROVINCE].name
      )
      .withFilter(
        FilterType.Equal,
        memberFilterFields.DISTRICT,
        memberFilter[memberFilterFields.DISTRICT].name
      )
      .withFilterInRange(
        memberFilterFields.HAS_SCORE,
        memberFilter[memberFilterFields.HAS_SCORE]
      )
      .withFilterInRange(
        memberFilterFields.TOTAL_AMOUNT,
        memberFilter[memberFilterFields.TOTAL_AMOUNT]
      )
      .withFilterInRange(
        memberFilterFields.NUMBER_OF_TIME_EATEN,
        memberFilter[memberFilterFields.NUMBER_OF_TIME_EATEN]
      )
      .withFilterInRange(
        memberFilterFields.DAYS_ARE_NOT_RETURNED,
        memberFilter[memberFilterFields.DAYS_ARE_NOT_RETURNED]
      );
    return builder.endWrapperFilter().build();
  }
}
