import { TranslateService } from './../../../../shared/services/translate.service';
import { ScheduledNotificationView } from '../../models/schedule-notification-view.model';
import { Component, OnInit } from '@angular/core';
import { ScheduledNotificationService } from '../../services/scheduled-notification.service';
import { IFilterChangedEvent } from '../../../../shared/ui-common/datagrid/components/datagrid.component';
import { Router } from '@angular/router';
import { ExDialog } from '../../../../shared/ui-common/modal/services/ex-dialog.service';
import { NotificationService } from '../../../../shared/services/notification.service';

@Component({
    selector: 'app-scheduled-notifications',
    templateUrl: './scheduled-notifications.component.html',
    styleUrls: ['./scheduled-notifications.component.css']
})
export class ScheduledNotificationsComponent implements OnInit {
    public notifications: ScheduledNotificationView[];
    private currentFilterArgs: IFilterChangedEvent;

    constructor(
        private readonly scheduledNotificationService: ScheduledNotificationService,
        private readonly route: Router,
        private readonly translateService: TranslateService,
        private readonly dialogManager: ExDialog,
        private notificationService: NotificationService
    ) {
        this.notifications = [];
        this.currentFilterArgs = { pagination: null, searchKey: null };
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
                this.notifications = data;
            });
    }
    createNewScheduledNotification() {
        this.route.navigate(['push-notification/scheduled-notification/create']);
    }

    viewNotification(notification) {}

    editNotification(notification) {
        this.route.navigate([`push-notification/scheduled-notification/edit/${notification._id}`]);
    }

    deleteNotification(notification) {
        const confirmMsg = this.translateService.translate(
            'delete-create-scheduled-notification-confirm-message',
            notification.name
        );
        const confirmTitle = this.translateService.translate('delete-create-scheduled-notification-confirm-title');
        this.dialogManager.openConfirm(confirmMsg, confirmTitle).subscribe(result => {
            if (result) {
                this.scheduledNotificationService.deleteScheduledNotification(notification._id).subscribe(res => {
                    this.fetchScheduledNotification();
                });
            }
        });
    }
}
