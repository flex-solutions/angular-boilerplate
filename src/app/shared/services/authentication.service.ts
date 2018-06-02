import { Router } from '@angular/router';
import { Injectable, Injector } from '@angular/core';
import { ApplicationConfigurationService } from './application-configuration.service';
import { NavigateConstant } from '../constants/navigate.constant';
import { AuthenticationResponse } from '../models/authentication.model';
import { CustomErrorHandlerService } from './custom-error-handler.service';
import { HelperService } from './helper.service';
import { SignedUser, BasicUserInfo } from '../models/user.model';
import { appVariables } from '../../app.constant';
import { AuthenticationTokenHelper } from '../../utilities/authentication-token';
import { AbstractRestService } from '../abstract/abstract-rest-service';
import { Observable } from 'rxjs';

@Injectable()
export class AuthenticationService extends AbstractRestService {
  protected controllerName: string;
  private username: string;
  constructor(private router: Router) {
    super();
    this.controllerName = 'auth';
  }

  authenticated(): boolean {
    // ! JUST FOR TESTING. REMOVE LATER
    // if (this.username === 'admin') {
    //   return true;
    // }
    // // ! JUST FOR TESTING. REMOVE LATER
    // if (AuthenticationTokenHelper.localToken) {
    //   const expireUtcDate = parseInt(AuthenticationTokenHelper.expireTime, 0);
    //   const dateNow = Date.now() / 1000;
    //   if (expireUtcDate < dateNow) {
    //     this.logOut();
    //     return false;
    //   }
    //   return true;
    // }
    // return false;

    return true;
  }

  logOut() {
    const authData = AuthenticationTokenHelper.localToken;
    const userInfo = AuthenticationTokenHelper.localUserInfo;
    if (authData && userInfo) {
      this.put(
        `${AuthenticationTokenHelper.localUserInfo._id}/logout`,
        ''
      ).subscribe(res => {
        AuthenticationTokenHelper.removeTokenInCookie();
        this.router.navigate([NavigateConstant.LOGIN]);
      });
    } else {
      AuthenticationTokenHelper.removeTokenInCookie();
      this.router.navigate([NavigateConstant.LOGIN]);
    }
  }

  login(signedUser: SignedUser) {
    // ! JUST FOR TESTING. REMOVE LATER
    if (signedUser.username === 'admin') {
      // Navigate to home page
      this.username = 'admin';
      this.router.navigate([NavigateConstant.HOME]);
      return new Observable(sub => {});
    }
    // ! JUST FOR TESTING. REMOVE LATER

    return this.post('login', signedUser);
  }

  autoLogin() {
    this.renewToken().subscribe(
      (newToken: AuthenticationResponse) => {
        AuthenticationTokenHelper.saveTokenInCookie(newToken);
      },
      err => {
        AuthenticationTokenHelper.removeTokenInCookie();
        this.navigateToLoginPage();
      }
    );
  }

  verifyRecaptchaToken(userToken: string) {
    return this.post('verify', { usertoken: userToken });
  }

  private renewToken() {
    const usernameInCookie = AuthenticationTokenHelper.localUserInfo.username;
    const refreshTokenInCookie = AuthenticationTokenHelper.refreshToken;

    return this.post('token', {
      username: usernameInCookie,
      refreshToken: refreshTokenInCookie
    });
  }

  navigateToLoginPage() {
    this.router.navigate([NavigateConstant.LOGIN]);
  }

  getAuthorizationToken(): string {
    return AuthenticationTokenHelper.localToken;
  }

  getCurrentUser(): BasicUserInfo {
    const userInfo = AuthenticationTokenHelper.localUserInfo;
    if (userInfo) {
      return userInfo;
    }

    const info: BasicUserInfo = {
      _id: '',
      email: '',
      username: '',
      branch_id: '',
      avatar: '',
      fullname: ''
    };
    return info;
  }

  recoverPassword<T>(lang: string, email: string) {
    return this.post<T>('recover-password', { lang: lang, email: email });
  }
}
