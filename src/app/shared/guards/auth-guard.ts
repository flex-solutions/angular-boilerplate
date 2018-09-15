import { AuthenticationTokenHelper } from './../../utilities/authentication-token';
import { Observable } from 'rxjs';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { Injectable } from '@angular/core';
import 'reflect-metadata';
import { PermissionDecoratorKey, IPermissionModule, IHasPermission } from './common';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private readonly authenticationService: AuthenticationService) {
    }

    canActivate(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
    ): Observable < boolean > | Promise < boolean > | boolean {
      const hasAuthenticated = this.authenticationService.authenticated();
      if (!hasAuthenticated) {
        this.authenticationService.logOut();
        return false;
      }
      return true;
    }

    // canActivateChild(
    //   route: ActivatedRouteSnapshot,
    //   state: RouterStateSnapshot
    // ): Observable < boolean > | Promise < boolean > | boolean {
    //   const hasAuthenticated = this.authenticationService.authenticated();
    //   if (!hasAuthenticated) {
    //     this.authenticationService.logOut();
    //     return false;
    //   } else {
    //     const component = route.component;
    //     if (component) {
    //       const permissionDecorator = Reflect.getMetadata(PermissionDecoratorKey, component) as IPermissionModule;
    //       if (permissionDecorator) {
    //         return this.authenticationService.hasPermission(permissionDecorator, component);
    //       }
    //     }
    //   }
    //   return true;
    // }
}
