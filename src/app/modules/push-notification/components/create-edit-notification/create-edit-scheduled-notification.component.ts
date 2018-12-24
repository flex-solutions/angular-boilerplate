import { PushNotificationService } from './../../services/push-notification';
import { Component, OnInit, ViewChild } from '@angular/core';
import { WizardComponent } from '../../../../shared/ui-common/wizard/wizard/wizard.component';
import { MemberHomeComponent } from '../../../member/components/home/home.component';
import { TranslateService } from '../../../../shared/services/translate.service';
import { NotificationService } from '../../../../shared/services/notification.service';
import { Location } from '@angular/common';
import { isNullOrEmptyOrUndefined } from '../../../../utilities/util';
import { convertCriteriaToQueryString } from '../../../../utilities/search-filter';
import { ScheduleType, getScheduleTypeName, ScheduledNotification } from '../../models/create-edit-schedule-notification.model';
import { ScheduledNotificationCreationData, IOption } from '../../models/schedule-notification-creation-data';
import { ActivatedRoute, Params } from '@angular/router';

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
        selectedDays: null,
        notificationTitle: null,
        notificationContent: null,
        notificationName: null
    };

    // Binding model
    selectedSchedule: IOption;
    selectedDays: number;
    selectedTimeToPushNotification: IOption;
    selectedDayOfWeek: IOption;
    selectedDayOfMonth: IOption;
    notificationContent: string;
    notificationTitle: string;
    notificationName: string;

    isEditMode: boolean;
    editingId: any;
    isForceValidate = false;
    cardTitle: string;
    cardDescription: string;

    @ViewChild(WizardComponent)
    private wizardComponent: WizardComponent;

    @ViewChild(MemberHomeComponent)
    private membersList: MemberHomeComponent;

    constructor(
        private readonly _translateService: TranslateService,
        private readonly _notificationService: NotificationService,
        private readonly _location: Location,
        private readonly _activeRoute: ActivatedRoute,
        private readonly _scheduledNotificationService: PushNotificationService
    ) {}

    ngOnInit() {
        this.initialData();
        this._activeRoute.params.subscribe((params: Params) => {
            this.editingId = params['id'] ? params['id'] : '';
            this.isEditMode = params['id'] ? true : false;
            if (this.isEditMode) {
                this.cardTitle = this._translateService.translate('edit-scheduled-notification-title');
                this.cardDescription = this._translateService.translate('edit-scheduled-notification-sub-title');
                this._scheduledNotificationService.getScheduledNotificationById(this.editingId).subscribe((data: ScheduledNotification) => {
                    this.setDataForEditMode(data);
                });
            } else {
                this.cardTitle = this._translateService.translate('create-scheduled-notification-title');
                this.cardDescription = this._translateService.translate('create-scheduled-notification-sub-title');
            }
        });
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

    onNextStep1() {
        if (+this.selectedSchedule.id === ScheduleType.DaysAreNotReturned) {
            Object.assign(this.membersList.memberFilter, {
                daysAreNotReturned: {
                    from: this.selectedDays ? this.selectedDays : 0,
                    to: 1000000 // : 365 = 237 years
                }
            });

            this.membersList.loadData();
        } else {
            this.membersList.resetFilter();
        }
    }

    private onSubmit() {
        const notification = this.buildScheduledNotification();
        if (this.isEditMode) {
            this._scheduledNotificationService.updateScheduledNotification(this.editingId, notification).subscribe(() => {
                this._notificationService.showSuccess(
                    this._translateService.translate('edit-scheduled-notification-wizard_step-success-message')
                );
                this.reset();
            });
        } else {
            this._scheduledNotificationService.createScheduledNotification(notification).subscribe(() => {
                this._notificationService.showSuccess(
                    this._translateService.translate('create-scheduled-notification-wizard_step-success-message')
                );
                this.reset();
            });
        }
    }

    private buildScheduledNotification() {
        const scheduledNotification = new ScheduledNotification();
        scheduledNotification.type = +this.selectedSchedule.id;
        switch (scheduledNotification.type) {
            case ScheduleType.Weekly:
                scheduledNotification.days = this.selectedDayOfWeek.id;
                break;

            case ScheduleType.Monthly:
                scheduledNotification.days = this.selectedDayOfMonth.id;
                break;

            case ScheduleType.DaysAreNotReturned:
                scheduledNotification.days = this.selectedDays;
                break;
        }
        scheduledNotification.name = this.notificationName;
        scheduledNotification.timeToPush = this.selectedTimeToPushNotification.id;
        scheduledNotification.title = this.notificationTitle;
        scheduledNotification.content = this.notificationContent;
        const memberCriteria = this.membersList.getFilterQuery();
        scheduledNotification.memberFilterRaw = this.membersList.memberFilter;
        scheduledNotification.memberFilter = convertCriteriaToQueryString(memberCriteria);
        return scheduledNotification;
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
        this.selectedDayOfWeek = this.daysOfWeek[0];
        this.daysOfMonth = ScheduledNotificationCreationData.dayOfMonth;
        this.selectedDayOfMonth = this.daysOfMonth[0];
        this.timesToPushNotification = ScheduledNotificationCreationData.timeToPushNotification;
        this.selectedTimeToPushNotification = this.timesToPushNotification[0];
    }

    private setDataForEditMode(editingNotification: ScheduledNotification) {
        this.selectedSchedule = this.scheduleTypes.find(t => t.id === editingNotification.type);
        this.selectedTimeToPushNotification = this.timesToPushNotification.find(t => t.id === editingNotification.timeToPush);
        this.notificationContent = editingNotification.content;
        this.notificationName = editingNotification.name;
        this.notificationTitle = editingNotification.title;
        if (!isNullOrEmptyOrUndefined(editingNotification.memberFilterRaw)) {
            Object.assign(this.membersList.memberFilter, editingNotification.memberFilterRaw);
            this.membersList.loadData();
        }

        switch (+this.selectedSchedule.id) {
            case ScheduleType.Weekly:
                this.selectedDayOfWeek = this.daysOfWeek.find(t => t.id === editingNotification.days);
                break;

            case ScheduleType.Monthly:
                this.selectedDayOfMonth = this.daysOfMonth.find(t => t.id === editingNotification.days);
                break;

            case ScheduleType.DaysAreNotReturned:
                this.selectedDays = editingNotification.days;
                break;
        }
    }

    onValidate() {
        this.errors.notificationContent = isNullOrEmptyOrUndefined(this.notificationContent) ? 'Required' : null;
        this.errors.notificationTitle = isNullOrEmptyOrUndefined(this.notificationTitle) ? 'Required' : null;
        this.errors.notificationName = isNullOrEmptyOrUndefined(this.notificationName) ? 'Required' : null;
        this.errors.selectedDays = isNullOrEmptyOrUndefined(this.selectedDays) ? 'Required' : null;
    }
}
