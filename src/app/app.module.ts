import { HttpService } from './shared/services/http.service';
import { environment } from './../environments/environment';
import { AuthenticationService } from './shared/services/authentication.service';
import { AccountRoutingModule } from './modules/account/account-routing.module';
import { AccountModule } from './modules/account/account.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, TRANSLATIONS, LOCALE_ID, Injector } from '@angular/core';
import { SharedModule } from './shared/shared.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { i18nFactory } from './i18n.factory';
import { UsersModule } from './modules/users/users.module';
import { UsersRoutingModule } from './modules/users/users-routing.module';
import { ApplicationConfigurationService } from './shared/services/application-configuration.service';
import {
  RecaptchaModule,
  RecaptchaSettings,
  RECAPTCHA_SETTINGS,
  RECAPTCHA_LANGUAGE
} from 'ng-recaptcha';
import { HttpModule } from '@angular/http';
import { DemoModule } from './modules/demo/demo.module';
import { DemoRoutingModule } from './modules/demo/demo-routing.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RecaptchaModule.forRoot(),
    HttpClientModule,
    HttpModule,
    SharedModule,
    AppRoutingModule,
    AccountModule,
    AccountRoutingModule,
    UsersModule,
    UsersRoutingModule,
    DemoModule,
    DemoRoutingModule
  ],
  providers: [
    {
      provide: TRANSLATIONS,
      useFactory: locale => i18nFactory(locale),
      deps: [LOCALE_ID]
    },
    {
      // Configure global setting for recaptcha
      provide: RECAPTCHA_SETTINGS,
      useValue: {
        siteKey: environment.INVISIBLE_RECAPTCHA_SITEKEY
      } as RecaptchaSettings
    },
    {
      // Configure language for recaptcha
      provide: RECAPTCHA_LANGUAGE,
      useFactory: locale => locale,
      deps: [LOCALE_ID]
    },
    ApplicationConfigurationService,
    AuthenticationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  static injector: Injector;

  constructor(injector: Injector) {
    AppModule.injector = injector;
  }
}
