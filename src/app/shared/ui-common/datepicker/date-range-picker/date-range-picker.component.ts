import { AfterViewInit, Output, EventEmitter, Input } from '@angular/core';
import { Component } from '@angular/core';
import { DateRangeModel } from '../model/date-range.model';
import { TranslateService } from '../../../services/translate.service';
declare const $: any;
declare const moment: any;

@Component({
  selector: 'app-date-range-picker',
  templateUrl: './date-range-picker.component.html'
})
export class DateRangePickerComponent implements AfterViewInit {

  private _dateRange: DateRangeModel;

  // Call when date ranged have changed
  @Output()
  dateRangeChanged = new EventEmitter<DateRangeModel>();

  @Input()
  get dateRange() {
    return this._dateRange;
  }

  set dateRange(value: DateRangeModel) {
    if (value !== this._dateRange) {
      this._dateRange = value;
      this.dateRangeChanged.emit(this._dateRange);
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
    this.picker.daterangepicker({
      autoUpdateInput: false,
      startDate: moment(this.dateRange.startDate),
      endDate: moment(this.dateRange.endDate),
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
        const result = new DateRangeModel();
        result.startDate = new Date(start.toISOString());
        result.endDate = new Date(end.toISOString());
        this.dateRange = result;
      });
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
    return $('input[name="daterange"]');
  }
}
