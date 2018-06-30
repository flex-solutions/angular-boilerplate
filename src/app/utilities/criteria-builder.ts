export class Criteria {
  private _name: string;
  private _condition: string | Criteria;

  constructor(name: string, condition: any) {
    this._name = name;
    this._condition = condition;
  }

  build() {
    return {
      [this._name]: this._condition
    };
  }
}

export class CriteriaBuilder {
  private constructor() {
    this._criteria = {};
  }
  private _criteria: any;

  static makeCriteria() {
    return new CriteriaBuilder();
  }

  withValue(name: string, value: string) {
    const criteria = new Criteria(name, value);
    Object.assign(this._criteria, criteria.build());
    return this;
  }

  withRegex(name: string, regex: string) {
    Object.assign(this._criteria, {
      [name]: { $regex: regex }
    });
    return this;
  }

  build(): {} {
    return this._criteria;
  }
}
