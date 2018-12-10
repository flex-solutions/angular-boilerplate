import { Component, OnInit } from '@angular/core';
import { ScheduledNotificationService } from '../../services/scheduled-notification.service';
import { IFilterChangedEvent } from '../../../../shared/ui-common/datagrid/components/datagrid.component';
import { ScheduledNotification } from '../../models/schedule-notification.model';

@Component({
  selector: 'app-scheduled-notifications',
  templateUrl: './scheduled-notifications.component.html',
  styleUrls: ['./scheduled-notifications.component.css']
})
export class ScheduledNotificationsComponent implements OnInit {
  public notifications: ScheduledNotification[];

  constructor(
    private readonly scheduledNotificationService: ScheduledNotificationService
  ) {
    this.notifications = [];
  }

  ngOnInit() {}

  count = (searchKey: string) => this.scheduledNotificationService.count(searchKey);

  onPageChanged($event: IFilterChangedEvent) {
    this.scheduledNotificationService.fetchScheduledNotifications(
      $event.pagination.page,
      $event.pagination.itemsPerPage,
      $event.searchKey
    );
  }

  createNewScheduledNotification() {}

  viewNotification(notification) {}

  editNotification(notification) {}

  deleteNotification(notification) {}
}
