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
import { PushNotificationService } from '../../services/push-notification';

@Component({
  selector: 'app-push-notification',
  templateUrl: './component.html'
})
export class PushNotificaionComponent implements OnInit {
  // Properties
  notificationMessage: string;
  title: string;

  @ViewChild(WizardComponent)
  private wizardComponent: WizardComponent;

  @ViewChild(MemberHomeComponent)
  membersList: MemberHomeComponent;

  constructor(
    protected fb: FormBuilder,
    protected translateService: TranslateService,
    private readonly pushNotificationService: PushNotificationService,
    private _notificationService: NotificationService,
    private _location: Location,
  ) {}

  ngOnInit() {
  }

  onWizardCancel() {
    this._location.back();
  }

  onWizardFinish() {
    this.pushNotification();
  }

  beforeNextStep1() {
    this.wizardComponent.selectedStep.canNext =
      !isNullOrEmptyOrUndefined(this.notificationMessage) &&
      !isNullOrEmptyOrUndefined(this.title);
  }

  private pushNotification() {
    const model = {
      memberFilter: convertCriteriaToQueryString(this.membersList.getFilterQuery()),
      message: this.notificationMessage,
      title: this.title,
    };
    this.pushNotificationService.pushNotification(model).subscribe(() => {
      this._notificationService.showSuccess('Gởi thông báo thành công');
    });
  }
}
