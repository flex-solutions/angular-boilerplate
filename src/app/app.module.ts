import { AuthenticationService } from './shared/services/authentication.service';
import { AccountRoutingModule } from './modules/account/account-routing.module';
import { AccountModule } from './modules/account/account.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, TRANSLATIONS, LOCALE_ID } from '@angular/core';
import { SharedModule } from './shared/shared.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MenuComponent } from './menu/menu.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { i18nFactory } from './i18n.factory';
import { TranslateService } from './shared/services/translateService';
import { UsersModule } from './modules/users/users.module';
import { UsersRoutingModule } from './modules/users/users-routing.module';
import { ApplicationConfigurationService } from './shared/services/application-configuration.service';
@NgModule({
  declarations: [AppComponent, DashboardComponent, MenuComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    SharedModule,
    AppRoutingModule,
    AccountModule,
    AccountRoutingModule,
    UsersModule,
    UsersRoutingModule
  ],
  providers: [
    {
      provide: TRANSLATIONS,
      useFactory: locale => i18nFactory(locale),
      deps: [LOCALE_ID]
    },
    TranslateService,
    ApplicationConfigurationService,
    AuthenticationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
