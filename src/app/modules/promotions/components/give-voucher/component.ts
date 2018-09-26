import { isNil } from 'ramda';
import { Voucher } from './../../../../shared/models/voucher.model';
import { VoucherService } from './../../../vouchers/services/vouchers.service';
import { WizardComponent } from './../../../../shared/ui-common/wizard/wizard/wizard.component';
import { Location } from '@angular/common';
import { NotificationService } from './../../../../shared/services/notification.service';
import { IGiveVoucherModel } from './../../interfaces/promotion';
import { PromotionService } from './../../services/promotion.service';
import { WizardStep } from './../../../../shared/ui-common/wizard/wizard-step/wizard-step.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { TranslateService } from '../../../../shared/services/translate.service';
import { MemberHomeComponent } from '../../../member/components/home/home.component';
import { isNullOrEmptyOrUndefined } from '../../../../utilities/util';
import { UTF8Encoding } from '../../../../utilities/ utf8-regex';
import { convertCriteriaToQueryString } from '../../../../utilities/search-filter';

@Component({
  selector: 'app-give-voucher',
  templateUrl: './component.html'
})
export class GiveVoucherComponent implements OnInit {
  // Properties
  model: IGiveVoucherModel;
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
      applyDays: this.applyDays,
      notificationMsg: this.notificationMessage
    };
    this._promotionService.giveVoucher(this.model).subscribe(() => {
      this._notificationService.showSuccess('Tặng voucher hoàn tất');
    });
  }
}
