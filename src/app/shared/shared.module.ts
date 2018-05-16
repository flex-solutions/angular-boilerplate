import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from './layout/layout.module';
import { NotificationService } from './services/notification.service';
import { MessageService } from './services/message.service';

@NgModule({
  imports: [CommonModule],
  exports: [LayoutModule],
  providers: [NotificationService, MessageService],
  declarations: []
})
export class SharedModule {}
