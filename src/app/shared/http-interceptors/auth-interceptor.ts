import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest
} from '@angular/common/http';
import {
  Headers,
  Http,
  Request,
  RequestOptions,
  Response,
  XHRBackend
} from '@angular/http';

import { AuthenticationService } from '../services/authentication.service';
import { callLifecycleHooksChildrenFirst } from '@angular/core/src/view/provider';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private auth: AuthenticationService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    /*
    * The verbose way:
    // Clone the request and replace the original headers with
    // cloned headers, updated with the authorization.
    const authReq = req.clone({
      headers: req.headers.set('Authorization', authToken)
    });
    */
    // Clone the request and set the new header in one step.
    const options = this.createRequestOptions();
    const authReq = req.clone({ setHeaders: options });

    // send cloned request with header to the next handler.

    return next.handle(authReq);
  }

  createRequestOptions() {
    // Get auth token
    const token: string = this.auth.getAuthorizationToken();
    const header = { 'Content-Type': 'application/json', Authorization: token ? token : '' };

    return header;
  }
}
