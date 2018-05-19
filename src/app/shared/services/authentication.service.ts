import { BaseService } from './base.service';
import {
  ControllerConstant,
  ApiConstant
} from './../constants/api-route.constant';
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

@Injectable()
export class AuthenticationService {
  private isLogin: boolean;
  constructor(private baseService: BaseService, private router: Router) {}

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
      const logoutApi = this.baseService.buildApi(
        ControllerConstant.Account,
        ApiConstant.logout
      );
      this.baseService.get(logoutApi).subscribe(res => {
        sessionStorage.removeItem(ApplicationConstant.AUTH_REMEMBER);
        sessionStorage.removeItem(ApplicationConstant.AUTH_DATA);
        sessionStorage.removeItem(ApplicationConstant.AUTH_SCREENS);

        this.router.navigate([NavigateConstant.LOGIN]);
      });
    }
  }

  login() {
    this.isLogin = true;
    this.router.navigate([NavigateConstant.HOME]);
  }

  hasAuthRemember(): boolean {
    const remember = sessionStorage.getItem(ApplicationConstant.AUTH_REMEMBER);
    return remember === '1';
  }

  navigateToLoginPage() {
    this.router.navigate([NavigateConstant.LOGIN]);
  }
}
