import { Router } from '@angular/router';
import { Injectable, Injector } from '@angular/core';
import { ApplicationConfigurationService } from './application-configuration.service';
import { NavigateConstant } from '../constants/navigate.constant';
import { Authentication } from '../models/authentication.model';
import { CustomErrorHandlerService } from './custom-error-handler.service';
import { HelperService } from './helper.service';
import { SignedUser } from '../models/user.model';
import { appVariables } from '../../app.constant';
import { AuthenticationTokenHelper } from '../../utilities/authentication-token';
import { AbstractRestService } from '../abstract/abstract-rest-service';
import { ApplicationConstant } from '../constants/application.constant';

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
    if (this.username === 'admin') {
      return true;
    }
    // ! JUST FOR TESTING. REMOVE LATER
    if (AuthenticationTokenHelper.localToken) {
      const expireUtcDate = parseInt(AuthenticationTokenHelper.expireTime, 0);
      const dateNow = Date.now() / 1000;
      if (expireUtcDate < dateNow) {
        this.logOut();
        return false;
      }
      return true;
    }
    return false;
  }

  logOut() {
    const authData = AuthenticationTokenHelper.localToken;
    if (authData) {
      this.get('logout').subscribe(res => {
        AuthenticationTokenHelper.clearTokenInCookie();
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
      return new Promise(r => 'true');
    }
    // ! JUST FOR TESTING. REMOVE LATER

    return this.post('login', signedUser)
      .toPromise()
      .then((tokenResponse: Authentication) => {
        // Save token into cookies
        AuthenticationTokenHelper.saveTokenInCookie(
          tokenResponse,
          signedUser.username
        );

        // Navigate to home page
        this.router.navigate([NavigateConstant.HOME]);
      });
  }

  recoverPassword(email: string) {
    return this.post('recover-password', { email: email });
  }

  async validateUserToken(userToken: string) {
    return await this.post('verify', { usertoken: userToken }).toPromise();
  }

  verifyToken() {
    const usernameInCookie = localStorage.getItem(
      appVariables.accessTokenOwner
    );
    const refreshTokenInCookie = localStorage.getItem(
      appVariables.accessTokenOwner
    );

    return this.post('token', {
      username: usernameInCookie,
      refreshToken: refreshTokenInCookie
    })
      .toPromise()
      .then((newToken: Authentication) => {
        AuthenticationTokenHelper.clearTokenInCookie();
        AuthenticationTokenHelper.saveTokenInCookie(newToken, usernameInCookie);
      });
  }

  navigateToLoginPage() {
    this.router.navigate([NavigateConstant.LOGIN]);
  }

  getAuthorizationToken(): string {
    return AuthenticationTokenHelper.localToken;
  }
}
