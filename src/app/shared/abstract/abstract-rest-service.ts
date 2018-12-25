import { ApplicationConfigurationService } from '../services/application-configuration.service';
import {
  HttpErrorResponse,
  HttpClient,
  HttpHeaders
} from '@angular/common/http';
import { catchError, retry, finalize } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { SharedModule } from '../shared.module';
import { HttpExceptionResponse } from '../models/http-exception-response.model';
import { NotificationService } from '../services/notification.service';
import { TranslateService } from '../services/translate.service';
import { BrowserNotificationService } from '../services/browser-notification.service';
import { ForbiddenHandler } from '../services/forbidden-handler.service';
import { UTF8Encoding } from '../../utilities/ utf8-regex';
import FileSaver from 'file-saver';

export abstract class AbstractRestService {
  protected abstract controllerName: string;
  protected baseUrl: string;
  private configurationService: ApplicationConfigurationService;
  protected httpClient: HttpClient;
  protected notifier: NotificationService;
  protected translateService: TranslateService;
  protected browserNotifer: BrowserNotificationService;
  protected forbiddenHandler: ForbiddenHandler;

  protected get loaderService() {
    return SharedModule.injector.get('__loading_indicator__');
  }

  constructor() {
    // Get base url provide by application configuration service
    this.configurationService = SharedModule.injector.get(
      ApplicationConfigurationService
    );
    this.notifier = SharedModule.injector.get(NotificationService);
    this.baseUrl = this.configurationService.getApiUri();
    this.httpClient = SharedModule.injector.get(HttpClient);
    this.translateService = SharedModule.injector.get(TranslateService);
    this.browserNotifer = SharedModule.injector.get(BrowserNotificationService);
    this.forbiddenHandler = SharedModule.injector.get(ForbiddenHandler);
  }

  get<T>(relativeUrl?: string) {
    this.showLoader();
    const url = this.getFullUrl(relativeUrl);
    return this.httpClient.get<T>(url).pipe(
      catchError(err => this.handleError(err)),
      finalize(() => this.hideLoader())
    );
  }

  download(fileName, relativeUrl?: string) {
    this.showLoader();
    const url = this.getFullUrl(relativeUrl);
    return this.httpClient.get(url, { responseType: 'arraybuffer' }).pipe(
      catchError(err => this.handleError(err)),
      finalize(() => this.hideLoader())
    ).subscribe(res => {
      const blob = new Blob([new Uint8Array(res)]);
      FileSaver.saveAs(blob, fileName);
    });
  }

  getWithAbsoluteUrl<T>(absoluteUrl: string) {
    this.showLoader();
    const url = this.getApiWithoutController(absoluteUrl);
    return this.httpClient.get<T>(url).pipe(
      catchError(err => this.handleError(err)),
      finalize(() => this.hideLoader())
    );
  }

  getWithRetry<T>(relativeUrl: string, retryTimes: number) {
    this.showLoader();
    const url = this.getFullUrl(relativeUrl);
    return this.httpClient.get<T>(url).pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(err => this.handleError(err)),
      finalize(() => this.hideLoader())
    );
  }

  getWithFilter<T>(relativeUrl: string, filter: any) {
    this.showLoader();
    const url = this.getFullUrl(relativeUrl);
    const filterString = JSON.stringify(filter);
    const headers = new HttpHeaders().set('X-Filter', UTF8Encoding.utf8Encode(filterString));
    return this.httpClient
      .get<T>(url, {
        headers: headers
      })
      .pipe(
        catchError(err => this.handleError(err)),
        finalize(() => this.hideLoader())
      );
  }

  post<T>(relativeUrl, postBody: any) {
    this.showLoader();
    const url = this.getFullUrl(relativeUrl);
    return this.httpClient.post<T>(url, postBody).pipe(
      catchError(err => this.handleError(err)),
      finalize(() => this.hideLoader())
    );
  }

  put<T>(relativeUrl, putData) {
    this.showLoader();
    const url = this.getFullUrl(relativeUrl);
    return this.httpClient.put<T>(url, putData).pipe(
      catchError(err => this.handleError(err)),
      finalize(() => this.hideLoader())
    );
  }

  patch<T>(relativeUrl, putData) {
    this.showLoader();
    const url = this.getFullUrl(relativeUrl);
    return this.httpClient.patch<T>(url, putData).pipe(
      catchError(err => this.handleError(err)),
      finalize(() => this.hideLoader())
    );
  }

  delete<T>(relativeUrl, postBody?: any) {
    this.showLoader();
    const url = this.getFullUrl(relativeUrl);
    return this.httpClient.delete<T>(url).pipe(
      catchError(err => this.handleError(err)),
      finalize(() => this.hideLoader())
    );
  }

  showLoader() {
    this.loaderService.show();
  }

  hideLoader() {
    this.loaderService.hide();
  }

  protected getFullUrl(relativeUrl: string) {
    let fullUrl = '';
    if (this.controllerName) {
      fullUrl = this.getApiWithController(relativeUrl);
    } else {
      fullUrl = this.getApiWithoutController(relativeUrl);
    }

    return fullUrl;
  }

  // Build full path for api
  protected getApiWithController(api: string) {
    return api
      ? `${this.baseUrl}/${this.controllerName}/${api}`
      : `${this.baseUrl}/${this.controllerName}`;
  }

  protected getApiWithoutController(api: string) {
    return `${this.baseUrl}/${api}`;
  }

  private handleError(error: HttpErrorResponse) {
    if (error && error.status === 404) {
      this.notifier.showError(error.message);
      return throwError(error);
    }

    if (error && (error.status === 401 || error.status === 403)) {
      this.forbiddenHandler.publish();
    }

    const errorMsg = error.error as HttpExceptionResponse;
    if (errorMsg && errorMsg.message && errorMsg.message.message) {
      const messageType = errorMsg.message.message.type;
      const displayError =
        errorMsg.message.message.content[this.translateService.currentLocale];
      if (displayError) {
        switch (messageType) {
          case 0:
            this.notifier.showSuccessPersist(displayError);
            this.browserNotifer.generateNotification([
              {
                title: this.translateService.translate(
                  'notification-browser-title-success'
                ),
                alertContent: displayError
              }
            ]);
            break;
          case 1:
            this.notifier.showInfoPersist(displayError);
            this.browserNotifer.generateNotification([
              {
                title: this.translateService.translate(
                  'notification-browser-title-info'
                ),
                alertContent: displayError
              }
            ]);
            break;
          case 2:
            this.notifier.showWarningPersist(displayError);
            this.browserNotifer.generateNotification([
              {
                title: this.translateService.translate(
                  'notification-browser-title-warning'
                ),
                alertContent: displayError
              }
            ]);
            break;
          case 3:
            this.notifier.showErrorPersist(displayError);
            this.browserNotifer.generateNotification([
              {
                title: this.translateService.translate(
                  'notification-browser-title-error'
                ),
                alertContent: displayError
              }
            ]);
            break;
          default:
            break;
        }
      }
    }

    return throwError(error);
  }
}
