import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from './layout/layout.module';
import { NotificationService } from './services/notification.service';
import { MessageService } from './services/message.service';
import { TranslateService } from './services/translate.service';
import { HttpService } from './services/http.service';
import { HelperService } from './services/helper.service';
import { CustomErrorHandlerService } from './services/custom-error-handler.service';
import { httpInterceptorProviders } from './http-interceptors';

@NgModule({
  imports: [CommonModule],
  exports: [LayoutModule],
  providers: [
    NotificationService,
    MessageService,
    TranslateService,
    HttpService,
    HelperService,
    CustomErrorHandlerService,
    httpInterceptorProviders
  ],
  declarations: []
})
export class SharedModule {}
