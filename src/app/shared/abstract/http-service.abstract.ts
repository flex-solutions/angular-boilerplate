import 'rxjs/add/operator/map';
import 'rxjs/add/operator/finally';
import { Injectable } from '@angular/core';
import { RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { HttpService } from '../services/http.service';
import { HelperService } from '../services/helper.service';
import { CustomErrorHandlerService } from '../services/custom-error-handler.service';
import { ServiceResponse } from '../interfaces/service-response';
import { Error } from '../interfaces/error';
import { appVariables } from '../../app.constant';
import { environment } from '../../../environments/environment';
import { AppModule } from '../../app.module';

export abstract class AbstractHttpService {
  private http: HttpService;
  private errorHandler: CustomErrorHandlerService;
  private helperService: HelperService;
  protected abstract controllerName: string;

  constructor() {
    this.http = AppModule.injector.get(HttpService);
    this.errorHandler = AppModule.injector.get(CustomErrorHandlerService);
    this.helperService = AppModule.injector.get(HelperService);
  }

  get(relativeUrl) {
    // Helper service to start ng2-slim-loading-bar progress bar
    this.helperService.startLoader();
    const url = this.buildApiUrl(relativeUrl);
    return this.http
      .get(url)
      .map((res: Response) => {
        return this.handleResponse(res);
      })
      .catch((error: Response) =>
        Observable.throw(this.errorHandler.tryParseError(error))
      )
      .finally(() => {
        // stop ng2-slim-loading-bar progress bar
        this.helperService.stopLoader();
      });
  }

  post(relativeUrl, postBody: any, options?: RequestOptions) {
    this.helperService.startLoader();
    const url = this.buildApiUrl(relativeUrl);
    if (options) {
      return this.http
        .post(url, postBody, options)
        .map((res: Response) => {
          return this.handleResponse(res);
        })
        .catch((error: Response) => Observable.throw(error))
        .finally(() => {
          this.helperService.stopLoader();
        });
    } else {
      return this.http
        .post(url, postBody)
        .map((res: Response) => {
          return this.handleResponse(res);
        })
        .catch((error: Response) => Observable.throw(error))
        .finally(() => {
          this.helperService.stopLoader();
        });
    }
  }

  delete(relativeUrl, postBody: any) {
    this.helperService.startLoader();
    const url = this.buildApiUrl(relativeUrl);
    return this.http
      .delete(url)
      .map((res: Response) => {
        return this.handleResponse(res);
      })
      .catch((error: Response) => Observable.throw(error))
      .finally(() => {
        this.helperService.stopLoader();
      });
  }

  put(relattiveUrl, putData) {
    this.helperService.startLoader();
    const url = this.buildApiUrl(relattiveUrl);
    return this.http
      .put(url, putData)
      .map((res: Response) => {
        return this.handleResponse(res);
      })
      .catch((error: Response) => Observable.throw(error))
      .finally(() => {
        this.helperService.stopLoader();
      });
  }

  upload(relativeUrl: string, file: File) {
    const url = this.buildApiUrl(relativeUrl);
    const formData: FormData = new FormData();
    if (file) {
      formData.append('files', file, file.name);
    }
    this.helperService.addContentTypeHeader = false;
    return this.post(url, formData);
  }

  formUrlParam(relativeUrl, data) {
    const url = this.buildApiUrl(relativeUrl);
    let queryString = '';
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        if (!queryString) {
          queryString = `?${key}=${data[key]}`;
        } else {
          queryString += `&${key}=${data[key]}`;
        }
      }
    }
    return url + queryString;
  }

  handleResponse(res: Response): ServiceResponse {
    // My API sends a new jwt access token with each request,
    // so store it in the local storage, replacing the old one.
    this.refreshToken(res);
    const data = res.json();
    if (data.error) {
      const error: Error = { error: data.error, message: data.message };
      throw new Error(this.errorHandler.parseCustomServerErrorToString(error));
    } else {
      return data;
    }
  }

  refreshToken(res: Response) {
    const token = res.headers.get(appVariables.accessTokenServer);
    if (token) {
      localStorage.setItem(appVariables.accessTokenLocalStorage, `${token}`);
    }
  }

  buildApiUrl(relativeUrl: string): string {
    if (relativeUrl) {
      return `${environment.host}/${this.controllerName}/${relativeUrl}`;
    }
    return `${environment.host}/${this.controllerName}`;
  }
}
