import { NowPushNotificationComponent } from './components/now-push-notification/component';
import { CreateEditScheduledNotificationComponent, ScheduledNotificationsComponent } from './components';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

const pushNotificationModuleRoutes: Routes = [
    {
        path: 'now',
        component: NowPushNotificationComponent,
        data: {
            breadcrumb: 'Push notification now'
        }
    },
    {
        path: 'scheduled-notification',
        component: ScheduledNotificationsComponent,
        data: {
            breadcrumb: 'Scheduled Notification'
        }
    },
    {
        path: 'scheduled-notification/create',
        component: CreateEditScheduledNotificationComponent,
        data: {
            breadcrumb: 'Create Scheduled Notification'
        }
    },
    {
        path: 'scheduled-notification/edit/:id',
        component: CreateEditScheduledNotificationComponent,
        data: {
            breadcrumb: 'Edit Scheduled Notification'
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(pushNotificationModuleRoutes)],
    exports: [RouterModule]
})
export class PushNotificationRoutingModule {}
