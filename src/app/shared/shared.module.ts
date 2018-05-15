import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from './layout/layout.module';
import { NotificationService } from './services/notification.service';

@NgModule({
  imports: [CommonModule],
  exports: [LayoutModule],
  providers: [NotificationService],
  declarations: []
})
export class SharedModule {}
