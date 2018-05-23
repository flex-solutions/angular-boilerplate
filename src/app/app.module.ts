import { environment } from './../environments/environment';
import { AuthenticationService } from './shared/services/authentication.service';
import { AccountRoutingModule } from './modules/account/account-routing.module';
import { AccountModule } from './modules/account/account.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, TRANSLATIONS, LOCALE_ID } from '@angular/core';
import { SharedModule } from './shared/shared.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { i18nFactory } from './i18n.factory';
import { UsersModule } from './modules/users/users.module';
import { UsersRoutingModule } from './modules/users/users-routing.module';
import { ApplicationConfigurationService } from './shared/services/application-configuration.service';
import { DemoModule } from './modules/demo/demo.module';
import { DemoRoutingModule } from './modules/demo/demo-routing.module';
import { ModalDemoModule } from './modules/modal-demo/modal-demo.module';
import { ModalDemoRoutingModule } from './modules/modal-demo/modal-demo-routing.module';
import { DatagridDemoRoutingModule } from './modules/datagrid-demo/datagrid-demo-routing.module';
import { DatagridModule } from './shared/ui-common/datagrid/datagrid.module';
import { DatagridDemoModule } from './modules/datagrid-demo/datagrid-demo.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpClientModule,
    SharedModule,
    AppRoutingModule,
    AccountModule,
    AccountRoutingModule,
    UsersModule,
    UsersRoutingModule,
    DemoModule,
    DemoRoutingModule,
    ModalDemoModule,
    ModalDemoRoutingModule,
    DatagridDemoRoutingModule,
    DatagridDemoModule
  ],
  providers: [
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
export class AppModule {}
