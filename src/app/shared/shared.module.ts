import { CanUpdateDirective } from './guards/directive';
import { NgModule, Injector } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from './layout/layout.module';
import { NotificationService } from './services/notification.service';
import { MessageService } from './services/message.service';
import { TranslateService } from './services/translate.service';
import { HelperService } from './services/helper.service';
import { CustomErrorHandlerService } from './services/custom-error-handler.service';
import { httpInterceptorProviders } from './http-interceptors';
import { UICommonModule } from './ui-common/ui-common.module';
import { BrowserNotificationService } from './services/browser-notification.service';
import { ForbiddenHandler } from './services/forbidden-handler.service';

@NgModule({
  imports: [CommonModule],
  exports: [LayoutModule, UICommonModule],
  providers: [
    NotificationService,
    MessageService,
    TranslateService,
    HelperService,
    CustomErrorHandlerService,
    httpInterceptorProviders,
    BrowserNotificationService,
    ForbiddenHandler
  ],
  declarations: [ CanUpdateDirective ]
})
export class SharedModule {
  static injector: Injector;

  constructor(private injector: Injector) {
    SharedModule.injector = injector;
  }
}
