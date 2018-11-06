import * as moment from 'moment';
import { AfterViewInit, Output, EventEmitter, Input } from '@angular/core';
import { Component } from '@angular/core';
import { DateRangeModel } from '../model/date-range.model';
import { TranslateService } from '../../../services/translate.service';
import { Guid } from 'guid-typescript';
declare const $: any;

@Component({
  selector: 'app-date-range-picker',
  templateUrl: './date-range-picker.component.html'
})
export class DateRangePickerComponent implements AfterViewInit {

  private _dateRange: DateRangeModel;
  elementId: string;

  @Input() timePicker: boolean;
  @Input() canReset = true;
  @Input() canSelectPastDate = true;

  // Call when date ranged have changed
  @Output()
  dateRangeChange = new EventEmitter<DateRangeModel>();

  @Input()
  get dateRange() {
    return this._dateRange;
  }

  set dateRange(value: DateRangeModel) {
    if (value !== this._dateRange) {
      this._dateRange = value;
      this.dateRangeChange.emit(this._dateRange);
    }
  }

  constructor(private translateService: TranslateService) {
    this.elementId = Guid.create().toString();
  }

  ngAfterViewInit() {
    this.initialize();

    const format = this._getDateFormat();
    this.picker.on('apply.daterangepicker', function (ev, picker) {
      $(this).val(picker.startDate.format(format) + ' - ' + picker.endDate.format(format));
    });
  }

  initialize() {
    this.picker.daterangepicker({
        timePicker: this.timePicker,
        timePicker24Hour: this.timePicker,
        autoUpdateInput: false,
        startDate: moment(this.dateRange.startDate),
        endDate: moment(this.dateRange.endDate),
        minDate: this._getMinDate(),
        ranges: this.buildRanges(),
        showDropdowns: true,
        alwaysShowCalendars: true,
        locale: {
          cancelLabel: this.translateService.translate('date-range-picker_button_cancel'),
          applyLabel: this.translateService.translate('date-range-picker_button_apply'),
          customRangeLabel: this.translateService.translate('date-range-picker_button_custom_range'),
          format: this._getDateFormat()
        }
      },
      (start, end, label) => {
        const result = new DateRangeModel();
        result.startDate = moment(start).toDate();
        result.endDate = moment(end).toDate();
        this.dateRange = result;
      });

    // set default value
    if (this.dateRange && this.dateRange.startDate && this.dateRange.endDate) {
      const startDate = moment(this.dateRange.startDate);
      const endDate = moment(this.dateRange.endDate);
      const format = this._getDateFormat();
      this.picker.val(startDate.format(format) + ' - ' + endDate.format(format));
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
    this.dateRange = new DateRangeModel();
  }

  get picker() {
    return $(`input[id="${this.elementId}"]`);
  }

  onIconClicked() {
    this.picker.focus();
  }

  _getDateFormat() {
    return this.timePicker ? 'DD/MM/YYYY HH:mm' : 'DD/MM/YYYY';
  }

  _getMinDate() {
    return this.canSelectPastDate ? moment('19180101', 'YYYYMMDD') : moment();
  }
}
