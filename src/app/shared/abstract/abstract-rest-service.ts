import { ApplicationConfigurationService } from '../services/application-configuration.service';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { catchError, retry, finalize } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { SharedModule } from '../shared.module';
import { LoaderService } from '../ui-common/loading-bar/loader.service';
import { appVariables } from '../../app.constant';
import { HttpExceptionResponse } from '../models/http-exception-response.model';
import { NotificationService } from '../services/notification.service';
import { TranslateService } from '../services/translate.service';

export abstract class AbstractRestService {
  protected abstract controllerName: string;
  protected baseUrl: string;
  private configurationService: ApplicationConfigurationService;
  protected httpClient: HttpClient;
  protected loaderService: LoaderService;
  protected notifier: NotificationService;
  protected translateService: TranslateService;

  constructor() {
    // Get base url provide by application configuration service
    this.configurationService = SharedModule.injector.get(
      ApplicationConfigurationService
    );
    this.notifier = SharedModule.injector.get(NotificationService);
    this.baseUrl = this.configurationService.getApiUri();
    this.httpClient = SharedModule.injector.get(HttpClient);
    this.loaderService = SharedModule.injector.get(LoaderService);
    this.translateService = SharedModule.injector.get(TranslateService);
  }

  get<T>(relativeUrl: string) {
    this.showLoader();
    const url = this.getFullUrl(relativeUrl);
    return this.httpClient
      .get<T>(url)
      .pipe(
        catchError(err => this.handleError(err)),
        finalize(() => this.hideLoader())
      );
  }

  getWithRetry<T>(relativeUrl: string, retryTimes: number) {
    this.showLoader();
    const url = this.getFullUrl(relativeUrl);
    return this.httpClient.get<T>(url).pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(this.handleError),
      finalize(() => this.hideLoader())
    );
  }

  post<T>(relativeUrl, postBody: any) {
    this.showLoader();
    const url = this.getFullUrl(relativeUrl);
    return this.httpClient
      .post<T>(url, postBody)
      .pipe(catchError(this.handleError), finalize(() => this.hideLoader()));
  }

  put<T>(relativeUrl, putData) {
    this.showLoader();
    const url = this.getFullUrl(relativeUrl);
    return this.httpClient
      .put<T>(url, putData)
      .pipe(catchError(this.handleError), finalize(() => this.hideLoader()));
  }

  delete<T>(relativeUrl, postBody: any) {
    this.showLoader();
    const url = this.getFullUrl(relativeUrl);
    return this.httpClient
      .delete<T>(url)
      .pipe(catchError(this.handleError), finalize(() => this.hideLoader()));
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
    return `${this.baseUrl}/${this.controllerName}/${api}`;
  }

  protected getApiWithoutController(api: string) {
    return `${this.baseUrl}/${api}`;
  }

  private handleError(error: HttpErrorResponse) {
    if (error && error.status === 404) {
      this.notifier.showError(error.message);
      return throwError(error);
    }

    const errorMsg = error.error as HttpExceptionResponse;
    if (errorMsg && errorMsg.message && errorMsg.message.message) {
      const messageType = errorMsg.message.message.type;
      const displayError =
        errorMsg.message.message.content[this.translateService.currentLocale];
      if (displayError) {
        switch (messageType) {
          case 0:
            break;
          case 1:
            this.notifier.showInfoPersist(displayError);
            break;
          case 2:
            this.notifier.showWarningPersist(displayError);
            break;
          case 3:
            this.notifier.showErrorPersist(displayError);
            break;
          default:
            console.log(displayError);
            break;
        }
      }
    }

    return throwError('Something bad happened; please try again later.');
  }
}
