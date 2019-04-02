import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PushNotificationRoutingModule } from './push-notification.module.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { UICommonModule } from '../../shared/ui-common/ui-common.module';
import { pushNotificationComponents } from './components';
import { pushNotificationServices } from './services';
import { MemberModule } from '../member/member.module';

@NgModule({
  imports: [
    CommonModule,
    PushNotificationRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    UICommonModule,
    MemberModule
  ],
  declarations: [...pushNotificationComponents],
  providers: [...pushNotificationServices],
  entryComponents: [],
  exports: []
})
export class PushNotificationModule {}
