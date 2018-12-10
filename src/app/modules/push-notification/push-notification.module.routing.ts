import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ScheduledNotificationsComponent } from './components/scheduled-notifications/scheduled-notifications.component';

const pushNotificationModuleRoutes: Routes = [
  {
    path: 'scheduled-notification',
    component: ScheduledNotificationsComponent,
    data: {
      breadcrumb: 'Scheduled Notification'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(pushNotificationModuleRoutes)],
  exports: [RouterModule]
})
export class PushNotificationRoutingModule {}
