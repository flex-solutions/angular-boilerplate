import {
  ControllerConstant,
  ApiConstant
} from './../constants/api-route.constant';
import { Router, CanActivate } from '@angular/router';
import { Authentication } from './../../models/authentication.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApplicationConstant } from '../constants/application.constant';
import { ApplicationConfigurationService } from './application-configuration.service';
import { AbstractRestService } from '../abstract/abstract-rest-service';
import { NavigateConstant } from '../constants/navigate.constant';

@Injectable()
export class AuthenticationService extends AbstractRestService {
  constructor(
    httpClient: HttpClient,
    configService: ApplicationConfigurationService,
    private router: Router
  ) {
    super(ControllerConstant.Account, configService, httpClient);
  }

  authenticated(): boolean {
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
      const api = this.getApiWithController(ApiConstant.logout);
      this.get(api).subscribe(res => {
        sessionStorage.removeItem(ApplicationConstant.AUTH_REMEMBER);
        sessionStorage.removeItem(ApplicationConstant.AUTH_DATA);
        sessionStorage.removeItem(ApplicationConstant.AUTH_SCREENS);

        this.router.navigate([NavigateConstant.LOGIN]);
      });
    }
  }

  hasAuthRemember(): boolean {
    const remember = sessionStorage.getItem(ApplicationConstant.AUTH_REMEMBER);
    return remember === '1';
  }

  navigateToLoginPage() {
    this.router.navigate([NavigateConstant.LOGIN]);
  }

  getAuthorizationToken(): string {
    return '';
  }
}
