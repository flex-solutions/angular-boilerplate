import { Component, OnInit, ViewChild } from '@angular/core';
import { WizardComponent } from '../../../../shared/ui-common/wizard/wizard/wizard.component';
import { MemberHomeComponent } from '../../../member/components/home/home.component';
import { TranslateService } from '../../../../shared/services/translate.service';
import { NotificationService } from '../../../../shared/services/notification.service';
import { Location } from '@angular/common';
import { isNullOrEmptyOrUndefined } from '../../../../utilities/util';
import { convertCriteriaToQueryString } from '../../../../utilities/search-filter';
import { ScheduleType, getScheduleTypeName } from '../../models/create-edit-schedule-notification.model';
import { ScheduledNotificationCreationData, IOption } from '../../models/schedule-notification-creation-data';

@Component({
    templateUrl: './create-edit-scheduled-notification.component.html',
    styleUrls: ['./create-edit-scheduled-notification.component.css']
})
export class CreateEditScheduledNotificationComponent implements OnInit {
    // Items source
    scheduleTypes = [];
    timesToPushNotification = [];
    daysOfWeek = [];
    daysOfMonth = [];
    errors = {
        selectedDayOfMonth: null,
        selectedDays: null,
        selectedTimeToPushNotification: null,
        selectedDayOfWeek: null,
        notificationTitle: null,
        notificationContent: null
    };

    // Binding model
    selectedSchedule: IOption;
    selectedDays: number;
    selectedTimeToPushNotification: IOption;
    selectedDayOfWeek: IOption;
    selectedDayOfMonth: IOption;
    notificationContent: string;
    notificationTitle: string;

    successMsg: string;
    isEditMode: boolean;
    isForceValidate = false;

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
        this.initialData();
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
        this.isForceValidate = true;
        this.onValidate();
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

    private initialData() {
        const types = [
            { id: ScheduleType.Daily, name: this._translateService.translate(getScheduleTypeName(ScheduleType.Daily)) },
            { id: ScheduleType.Weekly, name: this._translateService.translate(getScheduleTypeName(ScheduleType.Weekly)) },
            { id: ScheduleType.Monthly, name: this._translateService.translate(getScheduleTypeName(ScheduleType.Monthly)) },
            {
                id: ScheduleType.DaysAreNotReturned,
                name: this._translateService.translate(getScheduleTypeName(ScheduleType.DaysAreNotReturned))
            }
        ];
        this.selectedSchedule = types[0];
        this.scheduleTypes.push(...types);
        this.daysOfWeek = ScheduledNotificationCreationData.dayOfWeek.map(i => {
            i.name = this._translateService.translate(i.messageCode);
            return i;
        });
        this.daysOfMonth = ScheduledNotificationCreationData.dayOfMonth;
        this.timesToPushNotification = ScheduledNotificationCreationData.timeToPushNotification;
    }

    private onValidate() {
        this.errors.selectedDayOfMonth = isNullOrEmptyOrUndefined(this.selectedDayOfMonth) ? 'Required' : null;
        this.errors.selectedDayOfWeek = isNullOrEmptyOrUndefined(this.selectedDayOfWeek) ? 'Required' : null;
        this.errors.notificationContent = isNullOrEmptyOrUndefined(this.notificationContent) ? 'Required' : null;
        this.errors.notificationTitle = isNullOrEmptyOrUndefined(this.notificationTitle) ? 'Required' : null;
        this.errors.selectedTimeToPushNotification = isNullOrEmptyOrUndefined(this.selectedTimeToPushNotification) ? 'Required' : null;
        this.errors.selectedDays = isNullOrEmptyOrUndefined(this.selectedDays) ? 'Required' : null;
    }

    onSelectedScheduleChange() {
        this.onValidate();
    }

    onSelectedDaysChange() {
        this.onValidate();
    }
    onSelectedTimeToPushNotificationChange() {
        this.onValidate();
    }

    onSelectedDayOfMonthChange() {
        this.onValidate();
    }

    onSelectedDayOfWeekChange() {
        this.onValidate();
    }

    onNotificationTitleChange() {
        this.onValidate();
    }

    onNotificationContentChange() {
        this.onValidate();
    }
}
