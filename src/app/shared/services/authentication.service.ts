import { async } from '@angular/core/testing';
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
import { AbstractHttpService } from '../abstract/http-service.abstract';

@Injectable()
export class AuthenticationService extends AbstractHttpService {
  protected controllerName: string;
  private username: string;
  constructor(private router: Router) {
    super();
    this.controllerName = 'auth';
  }

  authenticated(): boolean {
    // ! JUST FOR TESTING. REMOVE LATER
    if (this.username === 'admin') {
      return true;
    }
    // ! JUST FOR TESTING. REMOVE LATER
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
      this.get('logout').subscribe(res => {
        sessionStorage.removeItem(ApplicationConstant.AUTH_DATA);

        this.router.navigate([NavigateConstant.LOGIN]);
      });
    }
  }

  login(signedUser: SignedUser) {
    // ! JUST FOR TESTING. REMOVE LATER
    if (signedUser.username === 'admin') {
      this.username = 'admin';
      return;
    }
    // ! JUST FOR TESTING. REMOVE LATER

    return this.post('login', signedUser).toPromise().then((loginResponse: LoginResponse) => {
      // Save token into cookies
      sessionStorage.setItem(ApplicationConstant.AUTH_DATA, loginResponse.token);

      // Navigate to home page
      this.router.navigate([NavigateConstant.HOME]);
    });
  }

  async validateUserToken(userToken: string) {
    return await this.post('verify', { usertoken: userToken }).toPromise();
  }

  hasAuthRemember(): boolean {
    const remember = sessionStorage.getItem(ApplicationConstant.AUTH_REMEMBER);
    return remember === '1';
  }

  navigateToLoginPage() {
    this.router.navigate([NavigateConstant.LOGIN]);
  }
}
