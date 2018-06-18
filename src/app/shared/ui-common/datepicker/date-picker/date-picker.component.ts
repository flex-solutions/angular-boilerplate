import { SingleDateModel } from './../model/date-range.model';
import { AfterViewInit, Output, EventEmitter, Input } from '@angular/core';
import { Component } from '@angular/core';
import { TranslateService } from '../../../services/translate.service';
declare const $: any;
declare const moment: any;

@Component({
  selector: 'app-date-range-picker',
  templateUrl: './date-range-picker.component.html'
})
export class DateRangePickerComponent implements AfterViewInit {

  private _date: SingleDateModel;

  // Call when date ranged have changed
  @Output()
  dateChanged = new EventEmitter<SingleDateModel>();

  @Input()
  get date() {
    return this._date;
  }

  set dateRange(value: SingleDateModel) {
    if (value !== this._date) {
      this._date = value;
      this.dateChanged.emit(this._date);
    }
  }

  constructor(private translateService: TranslateService) { }

  ngAfterViewInit() {
    this.initialize();

    this.picker.on('apply.daterangepicker', function (ev, picker) {
      $(this).val(picker.startDate.format('MM/DD/YYYY') + ' - ' + picker.endDate.format('MM/DD/YYYY'));
    });
  }

  initialize() {
    $('input[name="daterange"]').daterangepicker({
      singleDatePicker: true,
      showDropdowns: true,
      minYear: 1901,
      maxYear: parseInt(moment().format('YYYY'), 10)
    },
      (start, end, label) => {
        this._date = start;
      });
  }

  reset() {
    this.picker.val('');
    this.dateRange = new SingleDateModel();
  }

  get picker() {
    return $('input[name="daterange"]');
  }
}
