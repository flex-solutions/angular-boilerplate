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
  default = '',
  Regex = '$regex',
  GreatThan = '$gt',
  LessThan = '$lt',
  Equal = '$eq',
  And = '$and',
  Or = '$or'
}

export enum ValueType {
  String = 'string',
  Number = 'number'
}

export class Criteria {
  filters: FilterSet[];

  constructor() {
    this.filters = [];
  }
}

interface ICriteriaBuilder {
  build();

  setFilter(filter: FilterSet);
}

interface IWrapperCriteriaBuilder extends ICriteriaBuilder {
  setWrapperFilter(
    logicalFilterType: FilterType.And | FilterType.Or
  ): IWrapperCriteriaBuilder;

  withFilter(
    type: FilterType,
    name?: string,
    value?: any,
    valueType?: ValueType
  );
}

export class CriteriaBuilder implements IWrapperCriteriaBuilder {
  private _criteria: Criteria;
  private _wrapperFilter: FilterSet;

  constructor() {
    this._criteria = new Criteria();
  }

  static makeCriteria() {
    return new CriteriaBuilder();
  }

  setFilter(filter: FilterSet) {
    this._criteria.filters.push(filter);
    return this;
  }

  setWrapperFilter(
    logicalFilterType: FilterType.And | FilterType.Or
  ): IWrapperCriteriaBuilder {
    this._wrapperFilter = { type: logicalFilterType, value: [] };
    this._criteria.filters.push(this._wrapperFilter);
    return this;
  }

  withFilter(
    type: FilterType,
    name: string,
    value: any,
    valueType: ValueType = ValueType.String
  ): IWrapperCriteriaBuilder {
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
    if (!this._wrapperFilter.value) {
      const filterArr = [];
      filterArr.push(filter);
      this._wrapperFilter.value = filterArr;
    } else {
      (<FilterSet[]>this._wrapperFilter.value).push(filter);
    }

    return this;
  }

  build() {
    return this._criteria;
  }
}
