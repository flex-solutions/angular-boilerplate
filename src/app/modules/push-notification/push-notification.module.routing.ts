import { CreateEditScheduledNotificationComponent, ScheduledNotificationsComponent } from './components';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

const pushNotificationModuleRoutes: Routes = [
    {
        path: 'scheduled-notification',
        component: ScheduledNotificationsComponent,
        data: {
            breadcrumb: 'Scheduled Notification'
        }
    },
    {
        path: 'create-scheduled-notification',
        component: CreateEditScheduledNotificationComponent,
        data: {
            breadcrumb: 'Create Scheduled Notification'
        }
    },
    {
        path: 'edit-scheduled-notification/:id',
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
