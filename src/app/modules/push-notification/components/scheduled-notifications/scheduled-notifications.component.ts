import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-scheduled-notifications',
  templateUrl: './scheduled-notifications.component.html',
  styleUrls: ['./scheduled-notifications.component.css']
})
export class ScheduledNotificationsComponent implements OnInit {
  public notifications: any[];

  constructor() {}

  ngOnInit() {}

  count = (searchKey: string): Observable<number> => {};

  onPageChanged($event) {}

  createNewScheduledNotification() {}

  viewNotification(notification) {}

  editNotification(notification) {}

  deleteNotification(notification) {}
}
