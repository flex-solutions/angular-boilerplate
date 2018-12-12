import { Component, OnInit, ViewChild } from '@angular/core';
import { WizardComponent } from '../../../../shared/ui-common/wizard/wizard/wizard.component';
import { MemberHomeComponent } from '../../../member/components/home/home.component';
import { TranslateService } from '../../../../shared/services/translate.service';
import { NotificationService } from '../../../../shared/services/notification.service';
import { Location } from '@angular/common';
import { isNullOrEmptyOrUndefined } from '../../../../utilities/util';
import { convertCriteriaToQueryString } from '../../../../utilities/search-filter';

@Component({
    templateUrl: './create-edit-scheduled-notification.component.html',
    styleUrls: ['./create-edit-scheduled-notification.component.css']
})
export class CreateEditScheduledNotificationComponent implements OnInit {
    // Items source
    scheduleTypes: [];
    timesToPushNotification: [];
    daysOfWeek: [];
    daysOfMonth: [];

    // Binding model
    selectedSchedule: any;
    selectedDays: number;
    selectedTimeToPushNotification: any;
    selectedDayOfWeek: any;
    selectedDayOfMonth: any;
    notificationContent: string;
    notificationTitle: string;

    successMsg: string;
    isEditMode: boolean;

    @ViewChild(WizardComponent)
    private wizardComponent: WizardComponent;

    @ViewChild(MemberHomeComponent)
    private membersList: MemberHomeComponent;

    constructor(
        private readonly _translateService: TranslateService,
        private readonly _notificationService: NotificationService,
        private readonly _location: Location
    ) {}

    ngOnInit() {
        const msgCode = this.isEditMode
            ? 'edit-scheduled-notification-wizard_step-success-message'
            : 'create-scheduled-notification-wizard_step-success-message';
        this.successMsg = this._translateService.translate(msgCode);
    }

    onWizardCancel() {
        this._location.back();
    }

    onWizardFinish() {
        this.onSubmit();
    }

    beforeNextStep1() {
        this.wizardComponent.selectedStep.canNext =
            !isNullOrEmptyOrUndefined(this.notificationContent) && !isNullOrEmptyOrUndefined(this.notificationTitle);
    }

    private onSubmit() {
        const model = {
            memberFilter: convertCriteriaToQueryString(this.membersList.getFilterQuery()),
            message: this.notificationContent,
            title: this.notificationTitle
        };
        // this._pushNotificationService.pushNotification(model).subscribe(() => {
        //     this._notificationService.showSuccess(this.successMsg);
        //     this.reset();
        // });
    }

    private reset() {
        this.membersList.resetFilter();
        this.notificationContent = '';
        this.notificationTitle = '';
        this.wizardComponent.reset();
    }
}
