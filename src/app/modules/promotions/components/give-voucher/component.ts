import { isEmpty, isNil } from 'ramda';
import { Voucher } from './../../../../shared/models/voucher.model';
import { VoucherService } from './../../../vouchers/services/vouchers.service';
import { WizardComponent } from './../../../../shared/ui-common/wizard/wizard/wizard.component';
import { Location } from '@angular/common';
import { NotificationService } from './../../../../shared/services/notification.service';
import { Promotion } from './../../interfaces/promotion';
import { PromotionService } from './../../services/promotion.service';
import { WizardStep } from './../../../../shared/ui-common/wizard/wizard-step/wizard-step.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { TranslateService } from '../../../../shared/services/translate.service';
import { MessageConstant } from '../../messages';
import { MemberHomeComponent } from '../../../member/components/home/home.component';
import { UTF8Encoding } from '../../../../utilities/ utf8-regex';
import { isNullOrEmptyOrUndefined } from '../../../../utilities/util';

@Component({
  selector: 'app-give-voucher',
  templateUrl: './component.html',
})
export class GiveVoucherComponent implements OnInit {
  // Properties
  currentStep: WizardStep;
  promotion: Promotion = new Promotion();
  promotionId: string;
  notificationMessage: string;
  applyDays = 30;

  vouchers: Voucher[] = [];
  selectedVoucher: Voucher = new Voucher();

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
    this.wizardComponent.canNext = true;
    this.getCampaignVoucher();
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

  onWizardValidated() {
    if (this.currentStep === 1) {
      this.wizardComponent.canNext = !isNullOrEmptyOrUndefined(this.selectedVoucher) && !isNil(this.selectedVoucher.code);
    }
  }

  onStepChanged(step: WizardStep) {
    this.currentStep = step;
  }

  get titleError() {
    return this.translateService.translate(MessageConstant.RequireTitle);
  }

  onSelectedVoucherChanged() {
    if (this.selectedVoucher) {
      this.notificationMessage = this.selectedVoucher.notificationMessage;
    }
  }

  private updateCustomerCareCampaignModel() {
    this.promotion.member_filter = this.membersList.memberFilter;
    this.promotion.valid_date_count = this.applyDays;
    this.promotion.voucher = this.selectedVoucher;
    if (!isNullOrEmptyOrUndefined(this.promotion.voucher)) {
      this.promotion.voucher.notificationMessage = this.notificationMessage;
    }
  }
}
