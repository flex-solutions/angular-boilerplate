import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxCaptchaModule } from 'ngx-captcha';
import { AccountRoutingModule } from './account-routing.module';
import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { environment } from '../../../environments/environment';

@NgModule({
  imports: [
    CommonModule,
    AccountRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxCaptchaModule.forRoot({
      invisibleCaptchaSiteKey: environment.INVISIBLE_RECAPTCHA_SITEKEY,
    }),
  ],
  declarations: [LoginComponent]
})
export class AccountModule { }
