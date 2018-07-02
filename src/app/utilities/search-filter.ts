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

export interface IFilterSetBuilder {
  build(): {};
}

export class FilterSetBuilder implements IFilterSetBuilder {
  constructor(protected filterSet: FilterSet) {}
  build() {
    const filter = {};
    filter[this.filterSet.type] = this.filterSet.value;
    const filterEntity = {};
    filterEntity[this.filterSet.name] = filter;
    return filterEntity;
  }
}

export class AndFilterSetBuilder extends FilterSetBuilder
  implements IFilterSetBuilder {
  build() {
    const filter = {};
    if (this.filterSet.value.length > 0) {
      const filterValues = [];
      (<FilterSet[]>this.filterSet.value).forEach(f => {
        const tmp = FilterSetBuilderFactory.createBuilder(f);
        filterValues.push(tmp.build());
      });
      filter[this.filterSet.type] = filterValues;
    }
    return filter;
  }
}

export class FilterSetBuilderFactory {
  static createBuilder(filterSet: FilterSet) {
    let builder: IFilterSetBuilder;
    switch (filterSet.type) {
      case FilterType.And:
        builder = new AndFilterSetBuilder(filterSet);
        break;
      default:
        builder = new FilterSetBuilder(filterSet);
        break;
    }
    return builder;
  }
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
    const criteriaQuery = {};
    this._criteria.filters.forEach(f => {
      const criteria = FilterSetBuilderFactory.createBuilder(f).build();
      Object.assign(criteriaQuery, criteria);
    });
    return criteriaQuery;
  }
}
