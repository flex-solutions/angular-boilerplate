export class DateRangeModel {
  startDate?: Date;
  endDate?: Date;
}

export class SingleDateModel {
  date: Date;

  constructor() {
    this.date = new Date(Date.now());
  }
}
