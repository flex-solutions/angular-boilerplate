export class FilterSet {
  name?: string;
  type: FilterType;
  value?: string | FilterSet[];
}

export enum FilterType {
  Regex = '$regex',
  GreatThan = '$gt',
  LessThan = '$lt',
  Equal = '$eq',
  And = '$and',
  Or = '$or'
}

export class Criteria {
  filters: FilterSet[];

  constructor() {
    this.filters = [];
  }
}

export class CriteriaBuilder {
  private _criteria: Criteria;
  private _setFilter: FilterSet;

  constructor() {
    this._criteria = new Criteria();
  }

  static makeCriteria() {
    return new CriteriaBuilder();
  }

  setFilter(type: FilterType, name?: string, value?: string | FilterSet[]) {
    this._setFilter = {
      name: name,
      type: type,
      value: value
    };
    this._criteria.filters.push(this._setFilter);
    return this;
  }

  withFilter(type: FilterType, name?: string, value?: string | FilterSet[]) {
    if (!this._setFilter) {
      throw new Error('setFilter must call the first');
    }
    if (
      (type === FilterType.And || type === FilterType.Or) &&
      (typeof value === 'string' || value instanceof String)
    ) {
      throw new Error(
        'value must be instanceof FilterSet[]. Because filter type is And/Or'
      );
    }
    if (!this._setFilter.value) {
      const filterArr = [];
      filterArr.push({
        name: name,
        type: type,
        value: value
      });
      this._setFilter.value = filterArr;
    } else {
      (<FilterSet[]>this._setFilter.value).push({
        name: name,
        type: type,
        value: value
      });
    }

    return this;
  }

  build() {
    return this._criteria;
  }
}
