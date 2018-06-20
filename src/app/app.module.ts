import { UsersRoutingModule } from './modules/users/users-routing.module';
import { PermissionSchemeRoutingModule } from './modules/permission-scheme/permission-scheme-routing.module';
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
import { UserGroupsRoutingModule } from './modules/user-groups/usergroup-routing.module';
import { UserGroupsModule } from './modules/user-groups/usergroup.module';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { PermissionSchemeModule } from './modules/permission-scheme/permission-scheme.module';
import { DialogModule } from './shared/ui-common/modal/dialog.module';
import { AuthGuard } from './shared/guards/auth-guard';
import { NewsModule } from './modules/news/news.module';
import { NewsRoutingModule } from './modules/news/news-routing.module';
import { UsersModule } from './modules/users/users.module';
import { PermissionSchemeRoutingModule } from './modules/permission-scheme/permission-scheme-routing.module';
import { UsersRoutingModule } from './modules/users/users-routing.module';
import { PromotionsModule } from './modules/promotions/promotions.module';
import { PromotionsRoutingModule } from './modules/promotions/promotions-routing.module';
// import { EditorModule } from '@tinymce/tinymce-angular';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpClientModule,
    SharedModule,
    AppRoutingModule,
    PubSubClientModule,
    UserGroupsRoutingModule,
    UserGroupsModule,
    DialogModule,
    UsersModule,
    UsersRoutingModule,
    PermissionSchemeModule,
    PermissionSchemeRoutingModule,
    NewsRoutingModule,
    NewsModule,
    PromotionsModule,
    PromotionsRoutingModule
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy,
      useValue: '/'
    },
    {
      provide: TRANSLATIONS,
      useFactory: locale => i18nFactory(locale),
      deps: [LOCALE_ID]
    },
    ApplicationConfigurationService,
    AuthenticationService
  ],
  bootstrap: [AppComponent]
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
