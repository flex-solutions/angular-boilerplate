import { Injectable, LOCALE_ID, Inject } from '@angular/core';
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

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private _locale: string;
  constructor(
    private auth: AuthenticationService,
    @Inject(LOCALE_ID) localeId
  ) {
    this._locale = localeId;
  }

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
    const header = {
      'Content-Type': 'application/json',
      Authorization: token ? `Bearer ${token}` : '',
      LangCode: this._locale
    };

    return header;
  }
}
