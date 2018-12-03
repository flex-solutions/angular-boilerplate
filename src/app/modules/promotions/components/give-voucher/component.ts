import * as moment from 'moment';
import { isNil } from 'ramda';
import { DateRangeModel } from './../../../../shared/ui-common/datepicker/model/date-range.model';
import { Voucher } from './../../../../shared/models/voucher.model';
import { VoucherService } from './../../../vouchers/services/vouchers.service';
import { WizardComponent } from './../../../../shared/ui-common/wizard/wizard/wizard.component';
import { Location } from '@angular/common';
import { NotificationService } from './../../../../shared/services/notification.service';
import { IGiveVoucherModel } from './../../interfaces/promotion';
import { PromotionService } from './../../services/promotion.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { TranslateService } from '../../../../shared/services/translate.service';
import { MemberHomeComponent } from '../../../member/components/home/home.component';
import { isNullOrEmptyOrUndefined } from '../../../../utilities/util';
import { convertCriteriaToQueryString } from '../../../../utilities/search-filter';

@Component({
  selector: 'app-give-voucher',
  templateUrl: './component.html'
})
export class GiveVoucherComponent implements OnInit {
  // Properties
  model: IGiveVoucherModel;
  notificationMessage: string;
  affectTime: DateRangeModel;

  vouchers: Voucher[] = [];
  selectedVoucher: Voucher = new Voucher();
  successMsg: string;

  @ViewChild(WizardComponent)
  private wizardComponent: WizardComponent;

  @ViewChild(MemberHomeComponent)
  membersList: MemberHomeComponent;

  constructor(
    protected fb: FormBuilder,
    protected translateService: TranslateService,
    private _promotionService: PromotionService,
    private _notificationService: NotificationService,
    private _location: Location,
    private readonly voucherService: VoucherService
  ) {}

  ngOnInit() {
    this.successMsg = this.translateService.translate('give-voucher-success');
    this.initAffectTime();
    this.getCampaignVoucher();
  }

  private initAffectTime() {
    const startDate = moment();
    const endDate = startDate.clone().add({days: 1}).set({hour: 23, minute: 59});

    const dateRange = new DateRangeModel();
    dateRange.startDate = startDate.toDate();
    dateRange.endDate = endDate.toDate();

    this.affectTime = dateRange;
  }

  private getCampaignVoucher() {
    this.voucherService.getAllVoucherCareCampaign().subscribe(vouchers => {
      this.vouchers = vouchers;
    });
  }

  onWizardCancel() {
    this._location.back();
  }

  onWizardFinish() {
    this.updateCustomerCareCampaignModel();
  }

  beforeNextStep1() {
    this.wizardComponent.selectedStep.canNext =
      !isNullOrEmptyOrUndefined(this.selectedVoucher) &&
      !isNil(this.selectedVoucher.code);
  }

  onSelectedVoucherChanged() {
    if (this.selectedVoucher) {
      this.notificationMessage = this.selectedVoucher.notificationMessage;
    }
  }

  private updateCustomerCareCampaignModel() {
    this.model = {
      voucher: this.selectedVoucher,
      member_filter: convertCriteriaToQueryString(this.membersList.getFilterQuery()),
      startDate: this.affectTime.startDate,
      endDate: this.affectTime.endDate,
      notificationMsg: this.notificationMessage
    };

    this._promotionService.giveVoucher(this.model).subscribe(() => {
      this._notificationService.showSuccess(this.successMsg);
      this.reset();
    });
  }

  private reset() {
    this.selectedVoucher = new Voucher();
    this.membersList.resetFilter();
    this.initAffectTime();
    this.notificationMessage = '';
    this.wizardComponent.reset();
  }
}
