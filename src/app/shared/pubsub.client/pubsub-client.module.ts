import { notificationToken } from './common';
import { PubSubConfigService } from './config';
import { factoryProvider, NotificationChannelFactory } from './core/factory';
import { PubSubParsingService } from './parser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [CommonModule],
    providers: [
        PubSubConfigService,
        PubSubParsingService,
        NotificationChannelFactory,
    ],
})

export class PubSubClientModule {
}
