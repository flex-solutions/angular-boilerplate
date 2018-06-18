import { Observable } from 'rxjs';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { Injectable } from '@angular/core';
import 'reflect-metadata';
import { PermissionDecoratorKey, IHasPermission } from './common';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {

    constructor(private readonly authenticationService: AuthenticationService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      console.log('auth guard', route, state);
      const hasAuthenticated = this.authenticationService.authenticated();
      if (!hasAuthenticated) {
        this.authenticationService.logOut();
        return false;
      }
      return true;
    }

    canActivateChild(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
    ): Observable<boolean>|Promise<boolean>|boolean {

      // const component  = route.component;
      // const permission = Reflect.getMetadata(PermissionDecoratorKey, component) as IHasPermission;
      // console.log(permission);
      const hasAuthenticated = this.authenticationService.authenticated();
      if (!hasAuthenticated) {
        this.authenticationService.logOut();
        return false;
      }
      return true;
    }
}
