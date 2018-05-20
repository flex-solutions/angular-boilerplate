import { async } from '@angular/core/testing';
import { BaseService } from './base.service';
import { Router, CanActivate } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApplicationConstant } from '../constants/application.constant';
import { ApplicationConfigurationService } from './application-configuration.service';
import { NavigateConstant } from '../constants/navigate.constant';
import { Authentication } from '../models/authentication.model';
import { HttpService } from './http.service';
import { CustomErrorHandlerService } from './custom-error-handler.service';
import { HelperService } from './helper.service';
import { NumberFormatStyle } from '@angular/common';
import { SignedUser, LoginResponse } from '../models/user.model';

@Injectable()
export class AuthenticationService {
  private isLogin: boolean;
  constructor(private baseService: BaseService, private router: Router) { }

  authenticated(): boolean {
    if (this.isLogin) {
      return true;
    }
    const authData = sessionStorage.getItem(ApplicationConstant.AUTH_DATA);
    if (authData) {
      const authInfo = <Authentication>JSON.parse(authData);
      const expireUtcDate = authInfo.expireTime;
      const dateNow = Date.now();
      if (expireUtcDate < dateNow) {
        this.logOut();
        return false;
      }
      return true;
    }
    return false;
  }

  logOut() {
    const authData = sessionStorage.getItem(ApplicationConstant.AUTH_DATA);
    if (authData) {
      const logoutApi = this.baseService.buildApi('auth', 'logout');
      this.baseService.get(logoutApi).subscribe(res => {
        sessionStorage.removeItem(ApplicationConstant.AUTH_DATA);

        this.router.navigate([NavigateConstant.LOGIN]);
      });
    }
  }

  async login(signedUser: SignedUser) {
    // Just for testing
    if (signedUser.username === 'root' && signedUser.password === 'root') {
      this.isLogin = true;
    }
    const loginApi = this.baseService.buildApi('auth', 'login');
    const loginResponse = <LoginResponse>await this.baseService.post(loginApi, signedUser).toPromise();
    // Save token into cookies
    sessionStorage.setItem(ApplicationConstant.AUTH_DATA, loginResponse.token);

    // Navigate to home page
    this.router.navigate([NavigateConstant.HOME]);
  }

  async validateUserToken(userToken: string) {
    const loginApi = this.baseService.buildApi('auth', 'verify');
    return await this.baseService.post(loginApi, { usertoken: userToken }).toPromise();
  }

  hasAuthRemember(): boolean {
    const remember = sessionStorage.getItem(ApplicationConstant.AUTH_REMEMBER);
    return remember === '1';
  }

  navigateToLoginPage() {
    this.router.navigate([NavigateConstant.LOGIN]);
  }
}
