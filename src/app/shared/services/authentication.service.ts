import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { NavigateConstant } from '../constants/navigate.constant';
import { AuthenticationResponse } from '../models/authentication.model';
import { SignedUser, BasicUserInfo } from '../models/user.model';
import { AuthenticationTokenHelper } from '../../utilities/authentication-token';
import { AbstractRestService } from '../abstract/abstract-rest-service';
import { IPermissionModule, IHasPermission } from '../guards/common';
import { IPermissionScheme, IPermissionSchemeDetail } from '../models/permission-scheme.model';
import { isNullOrEmptyOrUndefined } from '../../utilities/util';
import { equals } from 'ramda';
import ArrayExtension from '../../utilities/array.extension';

@Injectable()
export class AuthenticationService extends AbstractRestService {
  protected controllerName: string;
  private username: string;
  constructor(private router: Router) {
    super();
    this.controllerName = 'auth';
    this.forbiddenHandler.subscribe(() => {
      this.logOut();
    });
  }

  authenticated(): boolean {
    if (AuthenticationTokenHelper.localToken) {
      const expireUtcDate = parseInt(AuthenticationTokenHelper.expireTime, 0);
      const dateNow = Date.now() / 1000;
      if (expireUtcDate < dateNow) {
        this.logOut();
        return false;
      }
      return true;
    }
    this.logOut();
    return false;
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

    const info: BasicUserInfo = { _id: '', email: '', username: '', branch_id: '', avatar: '', fullname: '', userGroup: '' };
    return info;
  }

  recoverPassword<T>(lang: string, email: string) {
    return this.post<T>('recover-password', { lang: lang, email: email });
  }

  hasPermission(permission: IPermissionModule, permissionComponent: any): boolean {
    const currentPermission = <IPermissionScheme> JSON.parse(AuthenticationTokenHelper.userPermissions);
    if (isNullOrEmptyOrUndefined(currentPermission) || isNullOrEmptyOrUndefined(currentPermission.permission_details)) {
      return false;
    }

    const permissionDetail = ArrayExtension.getItem(currentPermission.permission_details,
      pd => equals(pd.controller.name, permission.module)) as IPermissionSchemeDetail;
    if (isNullOrEmptyOrUndefined(permissionDetail)) {
      return false;
    }

    permissionComponent.prototype.canInsert = permissionDetail.is_insert;
    permissionComponent.prototype.canUpdate = permissionDetail.is_update;
    permissionComponent.prototype.canDelete = permissionDetail.is_delete;

    return true;
  }
}
