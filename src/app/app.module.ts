import { VersionComponent } from './version/version.component';
import { AppService } from './app.service';
import { IPubSubConfig, PubSubConfigService } from './shared/pubsub.client/config';
import { environment } from './../environments/environment';
import { AuthenticationService } from './shared/services/authentication.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, TRANSLATIONS, LOCALE_ID } from '@angular/core';
import { SharedModule } from './shared/shared.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { i18nFactory } from './i18n.factory';
import { ApplicationConfigurationService } from './shared/services/application-configuration.service';
import { PubSubClientModule } from './shared/pubsub.client/pubsub-client.module';
import { NotificationChannelFactory } from './shared/pubsub.client/core/factory';
import { UserGroupsModule } from './modules/user-groups/usergroup.module';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { PermissionSchemeModule } from './modules/permission-scheme/permission-scheme.module';
import { DialogModule } from './shared/ui-common/modal/dialog.module';
import { NewsModule } from './modules/news/news.module';
import { UsersModule } from './modules/users/users.module';
import { PromotionsModule } from './modules/promotions/promotions.module';
import { MemberModule } from './modules/member/member.module';
import { VouchersModule } from './modules/vouchers/vouchers.module';
import { PosAndMenuModule } from './modules/pos-and-menu/module';
import { VersionController } from './version/controller';
import { VERSION_TOKEN } from './shared/interfaces/version';

@NgModule({
  declarations: [AppComponent, VersionComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpClientModule,
    SharedModule,
    AppRoutingModule,
    PubSubClientModule,
    DialogModule,
    UserGroupsModule,
    UsersModule,
    PermissionSchemeModule,
    NewsModule,
    PromotionsModule,
    MemberModule,
    VouchersModule,
    PosAndMenuModule
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy,
      useValue: '/'
    },
    {
      provide: VERSION_TOKEN,
      useClass: VersionController
    },
    {
      provide: TRANSLATIONS,
      useFactory: locale => i18nFactory(locale),
      deps: [LOCALE_ID]
    },
    ApplicationConfigurationService,
    AuthenticationService,
    AppService
  ],
  bootstrap: [AppComponent],
  entryComponents: [VersionComponent],
})
export class AppModule {
  constructor(pubsubConfigService: PubSubConfigService,
    private notificationChannelFactory: NotificationChannelFactory) {
    // Set config for pubsub
    const pubsubConfig: IPubSubConfig = { host: environment.host };
    pubsubConfigService.config = pubsubConfig;
    // Host a subscriber
    notificationChannelFactory.host();
  }
}
