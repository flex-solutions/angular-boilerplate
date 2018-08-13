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
import { isNullOrEmptyOrUndefine } from '../../../../utilities/util';
declare const $: any;
declare const moment: any;

@Component({
  selector: 'app-date-picker',
  styleUrls: ['./date-picker.component.css'],
  templateUrl: './date-picker.component.html'
})
export class DatePickerComponent implements OnInit, AfterViewInit {
  private _date: Date;

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
    if (this._date && this._date) {
      const date = moment(this._date);
      this.picker.val(date.format('DD/MM/YYYY'));
    }
    this.dateChange.emit(this._date);
  }

  constructor(private translateService: TranslateService) {
    this.elementId = Guid.create().toString();
    this.inputClasses = `form-control`;
  }

  ngOnInit(): void {
    if (this.title) {
      this.inputClasses += ` none-border-left`;
    }
  }

  ngAfterViewInit() {
    this.initialize();

    this.picker.on('apply.daterangepicker', (ev, picker) => {
      this.picker.val(picker.startDate.format('DD/MM/YYYY'));
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
        startDate: moment(this.date),
        endDate: moment(this.date),
        autoUpdateInput: false,
        ranges: this.buildRanges(),
        showDropdowns: true,
        alwaysShowCalendars: true,
        showCustomRangeLabel: false,
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
          format: 'DD/MM/YYYY'
        }
      },
      (start, end, label) => {
        const result = new Date(start.toISOString());
        this.date = result;
      }
    );
  }

  buildRanges() {
    const ranges = {};
    ranges[this.translateService.translate('date-range-picker_title_today')] = [
      moment(),
      moment()
    ];
    ranges[
      this.translateService.translate('date-range-picker_title_yesterday')
    ] = [moment().subtract(1, 'days'), moment().subtract(1, 'days')];
    ranges[
      this.translateService.translate('date-range-picker_title-seven-days-ago')
    ] = [moment().subtract(6, 'days'), moment()];
    ranges[
      this.translateService.translate('date-range-picker_title-30-days-ago')
    ] = [moment().subtract(29, 'days'), moment()];
    ranges[
      this.translateService.translate('date-range-picker_title-current_month')
    ] = [moment().startOf('month'), moment().endOf('month')];
    ranges[
      this.translateService.translate('date-range-picker_title-previous_month')
    ] = [
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
    if (!isNullOrEmptyOrUndefine($event) && $event.target) {
      try {
        const timeSpan = Date.parse($event.target.value);
        if (isNaN(timeSpan)) {
          this.date = null;
        }
      } catch {
        this.date = null;
      }
    }
  }
}
