import { NotificationService } from './shared/services/notification.service';
import { IPubSubConfig, PubSubConfigService } from './shared/pubsub.client/config';
import { environment } from './../environments/environment';
import { AuthenticationService } from './shared/services/authentication.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, TRANSLATIONS, LOCALE_ID } from '@angular/core';
import { SharedModule } from './shared/shared.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { i18nFactory } from './i18n.factory';
import { ApplicationConfigurationService } from './shared/services/application-configuration.service';
import { DemoModule } from './modules/demo/demo.module';
import { DemoRoutingModule } from './modules/demo/demo-routing.module';
import { ModalDemoModule } from './modules/modal-demo/modal-demo.module';
import { ModalDemoRoutingModule } from './modules/modal-demo/modal-demo-routing.module';
import { DatagridDemoRoutingModule } from './modules/datagrid-demo/datagrid-demo-routing.module';
import { DatagridModule } from './shared/ui-common/datagrid/datagrid.module';
import { DatagridDemoModule } from './modules/datagrid-demo/datagrid-demo.module';
import { PubSubClientModule } from './shared/pubsub.client/pubsub-client.module';
import { NotificationChannelFactory } from './shared/pubsub.client/core/factory';
import { UserGroupsRoutingModule } from './modules/user-groups/usergroup-routing.module';
import { UserGroupsModule } from './modules/user-groups/usergroup.module';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { PermissionSchemeModule } from './modules/permission-scheme/permission-scheme.module';
import { DialogModule } from './shared/ui-common/modal/dialog.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpClientModule,
    SharedModule,
    AppRoutingModule,
    DemoModule,
    DemoRoutingModule,
    ModalDemoModule,
    ModalDemoRoutingModule,
    DatagridDemoRoutingModule,
    DatagridDemoModule,
    PubSubClientModule,
    UserGroupsRoutingModule,
    UserGroupsModule,
    DialogModule
    PermissionSchemeModule
  ],
  providers: [
    {
      provide: TRANSLATIONS,
      useFactory: locale => i18nFactory(locale),
      deps: [LOCALE_ID]
    },
    ApplicationConfigurationService,
    AuthenticationService,
    AuthGuard
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
