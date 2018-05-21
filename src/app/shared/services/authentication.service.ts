import { async } from '@angular/core/testing';
import { Router, CanActivate } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApplicationConfigurationService } from './application-configuration.service';
import { NavigateConstant } from '../constants/navigate.constant';
import { Authentication } from '../models/authentication.model';
import { HttpService } from './http.service';
import { CustomErrorHandlerService } from './custom-error-handler.service';
import { HelperService } from './helper.service';
import { NumberFormatStyle } from '@angular/common';
import { SignedUser } from '../models/user.model';
import { AbstractHttpService } from '../abstract/http-service.abstract';
import { appVariables } from '../../app.constant';

@Injectable()
export class AuthenticationService extends AbstractHttpService {
  protected controllerName: string;
  private username: string;
  constructor(private router: Router) {
    super();
    this.controllerName = 'auth';
  }

  get localToken() {
    return sessionStorage.getItem(appVariables.accessTokenLocalStorage);
  }

  authenticated(): boolean {
    // ! JUST FOR TESTING. REMOVE LATER
    if (this.username === 'admin') {
      return true;
    }
    // ! JUST FOR TESTING. REMOVE LATER
    const authData = sessionStorage.getItem(appVariables.accessTokenLocalStorage);
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
    const authData = sessionStorage.getItem(appVariables.accessTokenLocalStorage);
    if (authData) {
      this.get('logout').subscribe(res => {
        sessionStorage.removeItem(appVariables.accessTokenLocalStorage);

        this.router.navigate([NavigateConstant.LOGIN]);
      });
    }
  }

  login(signedUser: SignedUser) {
    // ! JUST FOR TESTING. REMOVE LATER
    if (signedUser.username === 'admin') {
      // Navigate to home page
      this.username = 'admin';
      this.router.navigate([NavigateConstant.HOME]);
      return new Promise((r) => 'true');
    }
    // ! JUST FOR TESTING. REMOVE LATER

    return this.post('login', signedUser).toPromise().then((tokenResponse: Authentication) => {
      // Save token into cookies
      sessionStorage.setItem(appVariables.accessTokenLocalStorage, tokenResponse.token);
      sessionStorage.setItem(appVariables.accessTokenExpireTime, `${tokenResponse.expireTime}`);

      // Navigate to home page
      this.router.navigate([NavigateConstant.HOME]);
    });
  }

  async validateUserToken(userToken: string) {
    return await this.post('verify', { usertoken: userToken }).toPromise();
  }

  navigateToLoginPage() {
    this.router.navigate([NavigateConstant.LOGIN]);
  }
}
