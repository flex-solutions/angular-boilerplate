import { ScheduledNotificationView } from '../../models/schedule-notification-view.model';
import { Component, OnInit } from '@angular/core';
import { ScheduledNotificationService } from '../../services/scheduled-notification.service';
import { IFilterChangedEvent } from '../../../../shared/ui-common/datagrid/components/datagrid.component';
import { Router } from '@angular/router';

@Component({
    selector: 'app-scheduled-notifications',
    templateUrl: './scheduled-notifications.component.html',
    styleUrls: ['./scheduled-notifications.component.css']
})
export class ScheduledNotificationsComponent implements OnInit {
    public notifications: ScheduledNotificationView[];

    constructor(private readonly scheduledNotificationService: ScheduledNotificationService, private readonly route: Router) {
        this.notifications = [];
    }

    ngOnInit() {}

    count = (searchKey: string) => this.scheduledNotificationService.count(searchKey);

    onPageChanged($event: IFilterChangedEvent) {
        this.scheduledNotificationService
            .fetchScheduledNotifications($event.pagination.page, $event.pagination.itemsPerPage, $event.searchKey)
            .subscribe((data: ScheduledNotificationView[]) => {
                this.notifications = data;
            });
    }

    createNewScheduledNotification() {
        this.route.navigate(['create-scheduled-notification']);
    }

    viewNotification(notification) {}

    editNotification(notification) {
        this.route.navigate([`edit-scheduled-notification/${notification.id}`]);
    }

    deleteNotification(notification) {}
}
