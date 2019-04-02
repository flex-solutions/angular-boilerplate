import { WizardComponent } from './../../../../shared/ui-common/wizard/wizard/wizard.component';
import { Location } from '@angular/common';
import { NotificationService } from './../../../../shared/services/notification.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { TranslateService } from '../../../../shared/services/translate.service';
import { MemberHomeComponent } from '../../../member/components/home/home.component';
import { isNullOrEmptyOrUndefined } from '../../../../utilities/util';
import { convertCriteriaToQueryString } from '../../../../utilities/search-filter';
import { PushNotificationService } from '../../services/push-notification';

@Component({
  selector: 'app-now-push-notification',
  templateUrl: './component.html'
})
export class NowPushNotificationComponent implements OnInit {
  // Properties
  notificationMessage: string;
  title: string;
  successMsg: string;

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
    this.successMsg = this.translateService.translate('push-notification-success');
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
    this.pushNotificationService.pushNotificationNow(model).subscribe(() => {
      this._notificationService.showSuccess(this.successMsg);
      this.reset();
    });
  }

  private reset() {
    this.membersList.resetFilter();
    this.notificationMessage = '';
    this.title = '';
    this.wizardComponent.reset();
  }
}
