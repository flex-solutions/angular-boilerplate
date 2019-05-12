import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxCaptchaModule } from 'ngx-captcha';
import { AuthenticationRoutingModule } from './routing';
import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RecoveryPasswordComponent } from './components/recovery-password/recovery-password.component';

@NgModule({
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxCaptchaModule,
  ],
  declarations: [LoginComponent, RecoveryPasswordComponent]
})
export class AuthenticationModule { }
