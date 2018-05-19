import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from './layout/layout.module';
import { NotificationService } from './services/notification.service';
import { MessageService } from './services/message.service';
import { TranslateService } from './services/translate.service';

@NgModule({
  imports: [CommonModule],
  exports: [LayoutModule],
  providers: [NotificationService, MessageService, TranslateService],
  declarations: []
})
export class SharedModule {}
