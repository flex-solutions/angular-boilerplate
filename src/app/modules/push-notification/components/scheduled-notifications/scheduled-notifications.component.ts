import { TranslateService } from './../../../../shared/services/translate.service';
import { ScheduledNotificationView } from '../../models/schedule-notification-view.model';
import { Component, OnInit } from '@angular/core';
import { PushNotificationService } from '../../services/push-notification';
import { IFilterChangedEvent } from '../../../../shared/ui-common/datagrid/components/datagrid.component';
import { Router } from '@angular/router';
import { ExDialog } from '../../../../shared/ui-common/modal/services/ex-dialog.service';
import { isNullOrEmptyOrUndefined } from '../../../../utilities/util';
import { ScheduleType } from '../../models/create-edit-schedule-notification.model';
import { ScheduledNotificationCreationData } from '../../models/schedule-notification-creation-data';

@Component({
    selector: 'app-scheduled-notifications',
    templateUrl: './scheduled-notifications.component.html',
    styleUrls: ['./scheduled-notifications.component.css']
})
export class ScheduledNotificationsComponent implements OnInit {
    private currentFilterArgs: IFilterChangedEvent;
    private readonly dailyName: string;
    private readonly weeklyName: string;
    private readonly monthlyName: string;

    notifications: ScheduledNotificationView[];

    constructor(
        private readonly scheduledNotificationService: PushNotificationService,
        private readonly route: Router,
        private readonly translateService: TranslateService,
        private readonly dialogManager: ExDialog
    ) {
        this.notifications = [];
        this.currentFilterArgs = { pagination: null, searchKey: null };
        this.dailyName = this.translateService.translate('create-schedule-notification-schedule-daily');
        this.weeklyName = this.translateService.translate('create-schedule-notification-schedule-weekly');
        this.monthlyName = this.translateService.translate('create-schedule-notification-schedule-monthly');
    }

    ngOnInit() {}

    count = (searchKey: string) => this.scheduledNotificationService.count(searchKey);

    onPageChanged($event: IFilterChangedEvent) {
        this.currentFilterArgs = $event;
        this.fetchScheduledNotification();
    }

    private fetchScheduledNotification() {
        this.scheduledNotificationService
            .fetchScheduledNotifications(
                this.currentFilterArgs.pagination.page,
                this.currentFilterArgs.pagination.itemsPerPage,
                this.currentFilterArgs.searchKey
            )
            .subscribe((data: ScheduledNotificationView[]) => {
                if (!isNullOrEmptyOrUndefined(data)) {
                    this.notifications = data.map(n => {
                        n.schedule = this.buildScheduleFriendlyName(n);
                        return n;
                    });
                } else {
                    this.notifications = [];
                }
            });
    }
    createNewScheduledNotification() {
        this.route.navigate(['push-notification/scheduled-notification/create']);
    }

    editNotification(notification) {
        this.route.navigate([`push-notification/scheduled-notification/edit/${notification._id}`]);
    }

    deleteNotification(notification) {
        const confirmMsg = this.translateService.translate('delete-create-scheduled-notification-confirm-message', notification.name);
        const confirmTitle = this.translateService.translate('delete-create-scheduled-notification-confirm-title');
        this.dialogManager.openConfirm(confirmMsg, confirmTitle).subscribe(result => {
            if (result) {
                this.scheduledNotificationService.deleteScheduledNotification(notification._id).subscribe(res => {
                    this.fetchScheduledNotification();
                });
            }
        });
    }
    onNotificationClicked(notification) {}

    private buildScheduleFriendlyName(notification: ScheduledNotificationView): string {
        if (!isNullOrEmptyOrUndefined(notification)) {
            const timeToPush = ScheduledNotificationCreationData.timeToPushNotification.find(d => d.id === +notification.timeToPush)
                .friendlyName;
            switch (+notification.type) {
                case ScheduleType.Weekly:
                    const dayOfWeek = ScheduledNotificationCreationData.dayOfWeek.find(d => d.id === +notification.days);
                    return `${this.weeklyName}, ${this.translateService.translate(dayOfWeek.messageCode)}, ${timeToPush}`;

                case ScheduleType.Monthly:
                    return `${this.monthlyName}, ${notification.days}, ${timeToPush}`;

                case ScheduleType.Daily:
                    return `${this.dailyName}, ${timeToPush}`;

                case ScheduleType.DaysAreNotReturned:
                    return this.translateService.translate(
                        'create-schedule-notification-schedule-days-are-not-returned-x',
                        notification.days
                    );
            }
        }
        return null;
    }
}
