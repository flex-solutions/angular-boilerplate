import { isNullOrEmptyOrUndefine } from './util';

export class FilterSet {
  name?: string;
  type: FilterType;
  value?: string | FilterSet[];
  valueType?: ValueType;

  constructor() {
    this.valueType = ValueType.Number;
  }
}

export enum FilterType {
  Default = '',
  Regex = '$regex',
  GreatThan = '$gt',
  LessThan = '$lt',
  Equal = '$eq',
  And = '$and',
  Or = '$or',
  In = '$in',
  GreatThanEqual = '$gte',
  LessThanEqual = '$lte',
  ElementMatch = '$elemMatch'
}

export enum ValueType {
  String = 'string',
  Number = 'number',
  Array = 'array',
  Date = 'date',
  ObjectId = 'objectId',
  RegexContains = 'regex-contains',
}

export class Criteria {
  filter: FilterSet;

  constructor() {}
}

interface ICriteriaBuilder {
  build(): Criteria;
}

interface IStartWrapperFilter {
  startWrapperFilter(
    logicalFilterType: FilterType.And | FilterType.Or
  ): IWithFilterCriteria;
}

interface IWithFilterCriteria {
  endWrapperFilter(): ICriteriaBuilder;

  withFilter(
    type: FilterType,
    name?: string,
    value?: any,
    valueType?: ValueType
  ): IWithFilterCriteria;

  withCriteria(action: () => Criteria): IWithFilterCriteria;
}
export class CriteriaBuilder
  implements ICriteriaBuilder, IStartWrapperFilter, IWithFilterCriteria {
  private _criteria: Criteria;
  private _wrapperFilter: FilterSet;

  constructor() {
    this._criteria = new Criteria();
  }

  static makeCriteria() {
    return new CriteriaBuilder();
  }

  startWrapperFilter(
    logicalFilterType: FilterType.And | FilterType.Or
  ): IWithFilterCriteria {
    this._wrapperFilter = { type: logicalFilterType, value: [] };
    return this;
  }

  endWrapperFilter(): ICriteriaBuilder {
    if (!isNullOrEmptyOrUndefine(this._wrapperFilter.value)) {
      this._criteria.filter = this._wrapperFilter;
    }
    return this;
  }

  withFilter(
    type: FilterType,
    name: string,
    value: any,
    valueType: ValueType = ValueType.String
  ): IWithFilterCriteria {
    if (!this._wrapperFilter) {
      throw new Error('setWrapperFilter must call the first');
    }
    if (isNullOrEmptyOrUndefine(value)) {
      return this;
    }
    const filter = {
      type: type,
      name: name,
      value: value,
      valueType: valueType
    };
    this.constructFilter(filter);
    return this;
  }

  withCriteria(action: () => Criteria) {
    const criteria = action();
    if (!isNullOrEmptyOrUndefine(criteria)) {
      this.constructFilter(criteria.filter);
    }
    return this;
  }

  private constructFilter(filter) {
    if (!this._wrapperFilter.value) {
      const filterArr = [];
      filterArr.push(filter);
      this._wrapperFilter.value = filterArr;
    } else {
      (<FilterSet[]>this._wrapperFilter.value).push(filter);
    }
  }

  build() {
    if (!isNullOrEmptyOrUndefine(this._criteria.filter)) {
      return this._criteria;
    }

    return null;
  }
}
