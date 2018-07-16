
import { AfterViewInit, Output, EventEmitter, Input } from '@angular/core';
import { Component } from '@angular/core';
import { TranslateService } from '../../../services/translate.service';
import { Guid } from 'guid-typescript';
declare const $: any;
declare const moment: any;

@Component({
  selector: 'app-date-picker',
  styleUrls: ['./date-picker.component.css'],
  templateUrl: './date-picker.component.html'
})
export class DatePickerComponent implements AfterViewInit {

  private _date: Date;

  elementId: string;

  @Input()
  title: string;

  // Call when date have changed
  @Output()
  dateChange = new EventEmitter<Date>();

  @Input()
  get date() {
    return this._date;
  }

  set date(value: Date) {
    if (value !== this._date) {
      this._date = value;
      this.dateChange.emit(this._date);
    }
  }

  constructor(private translateService: TranslateService) {
    this.elementId = Guid.create().toString();
  }

  ngAfterViewInit() {
    this.initialize();

    this.picker.on('apply.daterangepicker', function (ev, picker) {
      $(this).val(picker.startDate.format('MM/DD/YYYY'));
    });
  }

  initialize() {
    this.picker.daterangepicker({
      singleDatePicker: true,
      startDate: moment(this.date),
      endDate: moment(this.date),
      autoApply: true,
      autoUpdateInput: false,
      ranges: this.buildRanges(),
      showDropdowns: true,
      alwaysShowCalendars: true,
      locale: {
        cancelLabel: this.translateService.translate('date-range-picker_button_cancel'),
        applyLabel: this.translateService.translate('date-range-picker_button_apply'),
        customRangeLabel: this.translateService.translate('date-range-picker_button_custom_range'),
        format: 'DD/MM/YYYY'
      }
    },
      (start, end, label) => {
        const result = new Date(start.toISOString());
        this.date = result;
      });

    // set default value
    if (this.date && this.date) {
      const date = moment(this.date);
      this.picker.val(date.format('MM/DD/YYYY'));
    }
  }

  buildRanges() {
    const ranges = {};
    ranges[this.translateService.translate('date-range-picker_title_today')] = [moment(), moment()];
    ranges[this.translateService.translate('date-range-picker_title_yesterday')] = [
      moment().subtract(1, 'days'),
      moment().subtract(1, 'days')
    ];
    ranges[this.translateService.translate('date-range-picker_title-seven-days-ago')] = [moment().subtract(6, 'days'), moment()];
    ranges[this.translateService.translate('date-range-picker_title-30-days-ago')] = [moment().subtract(29, 'days'), moment()];
    ranges[this.translateService.translate('date-range-picker_title-current_month')] = [moment().startOf('month'), moment().endOf('month')];
    ranges[this.translateService.translate('date-range-picker_title-previous_month')] = [
      moment()
        .subtract(1, 'month')
        .startOf('month'),
      moment()
        .subtract(1, 'month')
        .endOf('month')
    ];
    return ranges;
  }

  reset() {
    this.picker.val('');
    this.date = new Date();
  }

  get picker() {
    return $(`input[id="${this.elementId}"]`);
  }

  onIconClicked() {
    this.picker.focus();
  }
}
