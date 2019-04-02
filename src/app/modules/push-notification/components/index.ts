import { CreateEditScheduledNotificationComponent } from './create-edit-notification/create-edit-scheduled-notification.component';
import { ScheduledNotificationsComponent } from './scheduled-notifications/scheduled-notifications.component';
import { NowPushNotificationComponent } from './now-push-notification/component';

export const pushNotificationComponents = [
  ScheduledNotificationsComponent,
  CreateEditScheduledNotificationComponent,
  NowPushNotificationComponent,
];

export * from './create-edit-notification/create-edit-scheduled-notification.component';
export * from './scheduled-notifications/scheduled-notifications.component';
