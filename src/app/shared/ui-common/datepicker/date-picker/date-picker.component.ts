import {
  AfterViewInit,
  Output,
  EventEmitter,
  Input,
  OnInit
} from '@angular/core';
import { Component } from '@angular/core';
import { TranslateService } from '../../../services/translate.service';
import { Guid } from 'guid-typescript';
import { isNullOrEmptyOrUndefined, parseStringToBoolean } from '../../../../utilities/util';
declare const $: any;
declare const moment: any;

@Component({
  selector: 'app-date-picker',
  styleUrls: ['./date-picker.component.css'],
  templateUrl: './date-picker.component.html'
})
export class DatePickerComponent implements OnInit, AfterViewInit {
  private _date: Date;
  private _ignoreSetStartEndDate: boolean;
  private _formatDate: string;
  private _showRangeLabel = true;
  private _showDropDowns = true;

  elementId: string;
  inputClasses: string;

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
    this._date = value;
    // set value
    if (isNullOrEmptyOrUndefined(this._date)) {
      this.picker.val('');
    } else {
      const date = moment(this._date);
      this.picker.val(date.format(this.formatDate));
      if (!this._ignoreSetStartEndDate) {
        const dateRangePicker = this.picker.data('daterangepicker');
        if (dateRangePicker) {
          dateRangePicker.setStartDate(date);
          dateRangePicker.setEndDate(date);
        }
      }
      this._ignoreSetStartEndDate = false;
    }
    this.dateChange.emit(this._date);
  }

  @Input()
  set formatDate(val) {
    this._formatDate = val;
  }

  get formatDate() {
    return this._formatDate;
  }

  @Input()
  set showRangeLabel(val) {
    this._showRangeLabel = parseStringToBoolean(val);
  }

  get showRangeLabel() {
    return this._showRangeLabel;
  }

  @Input()
  set showDropDowns(val) {
    this._showDropDowns = parseStringToBoolean(val);
  }

  get showDropDowns() {
    return this._showDropDowns;
  }

  constructor(private translateService: TranslateService) {
    this.elementId = Guid.create().toString();
    this.inputClasses = `form-control`;
    this._formatDate = 'DD/MM/YYYY';
  }

  ngOnInit(): void {
    if (this.title) {
      this.inputClasses += ` none-border-left`;
    }
  }

  ngAfterViewInit() {
    this.initialize();

    // Incase the value of date was before view init
    const displayText = this.picker.val();
    if (
      isNullOrEmptyOrUndefined(displayText) &&
      !isNullOrEmptyOrUndefined(this._date)
    ) {
      const date = moment(this._date);
      this.picker.val(date.format(this.formatDate));
    }

    this.picker.on('apply.daterangepicker', (ev, picker) => {
      this.picker.val(picker.startDate.format(this.formatDate));
      this._ignoreSetStartEndDate = true;
      this.date = new Date(picker.startDate.toISOString());
    });

    this.picker.on('cancel.daterangepicker', (ev, picker) => {
      this.reset();
    });
  }

  initialize() {
    this.picker.daterangepicker(
      {
        singleDatePicker: true,
        startDate: moment(this.date ? this.date : new Date()),
        endDate: moment(this.date ? this.date : new Date()),
        autoUpdateInput: false,
        ranges: this.buildRanges(),
        alwaysShowCalendars: false,
        showCustomRangeLabel: false,
        showDropdowns: this._showDropDowns,
        opens: 'center',
        locale: {
          cancelLabel: this.translateService.translate(
            'date-range-picker_button_cancel'
          ),
          applyLabel: this.translateService.translate(
            'date-range-picker_button_apply'
          ),
          customRangeLabel: this.translateService.translate(
            'date-range-picker_button_custom_range'
          ),
          format: this.formatDate
        }
      },
      (start, end, label) => {
        const result = new Date(start.toISOString());
        this._ignoreSetStartEndDate = true;
        this.date = result;
      }
    );
  }

  buildRanges() {
    const ranges = {};
    if (this._showRangeLabel) {
      ranges[
        this.translateService.translate('date-range-picker_title_today')
      ] = [moment(), moment()];
      ranges[
        this.translateService.translate('date-range-picker_title_yesterday')
      ] = [moment().subtract(1, 'days'), moment().subtract(1, 'days')];
      ranges[
        this.translateService.translate(
          'date-range-picker_title-seven-days-ago'
        )
      ] = [moment().subtract(6, 'days'), moment()];
      ranges[
        this.translateService.translate('date-range-picker_title-30-days-ago')
      ] = [moment().subtract(29, 'days'), moment()];
      ranges[
        this.translateService.translate('date-range-picker_title-current_month')
      ] = [moment().startOf('month'), moment().endOf('month')];
      ranges[
        this.translateService.translate(
          'date-range-picker_title-previous_month'
        )
      ] = [
        moment()
          .subtract(1, 'month')
          .startOf('month'),
        moment()
          .subtract(1, 'month')
          .endOf('month')
      ];
    }
    return ranges;
  }

  reset() {
    this._ignoreSetStartEndDate = true;
    this.date = null;
    this.picker.val('');
  }

  get picker() {
    return $(`input[id="${this.elementId}"]`);
  }

  onIconClicked() {
    this.picker.focus();
  }

  onInputChanged($event) {
    if (!isNullOrEmptyOrUndefined($event) && $event.target) {
      try {
        const timeSpan = Date.parse($event.target.value);
        if (isNaN(timeSpan)) {
          this._ignoreSetStartEndDate = true;
          this.date = null;
        }
      } catch {
        this._ignoreSetStartEndDate = true;
        this.date = null;
      }
    }
  }
}
