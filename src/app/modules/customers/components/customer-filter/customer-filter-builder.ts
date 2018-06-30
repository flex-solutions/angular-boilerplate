import { CriteriaBuilder } from '../../../../utilities/criteria-builder';
import { CustomerFilter } from '../../../../shared/models/customer.model';

export class CustomerCriteriaBuilder {
  static build(filter: CustomerFilter) {
    const builder = CriteriaBuilder.makeCriteria();
    builder.withRegex('phoneNumber', filter.phoneNumber)
    .withRegex('name', filter.name)
    .withRegex('memberType', `${filter.memberType}`)
    .withRegex('sex', `${filter.sex}`)
    .withRegex('address', filter.address)
    .withRegex('memberId', filter.memberId)
    .withRegex('monthOfBirthday', `${filter.monthOfBirthday}`);

    console.log(builder.build());
  }
}
