import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable()
export class ApplicationConfigurationService {
  private _apiUri: string;
  private _pageSize: number;

  constructor() {
    this._apiUri = environment.host;
    this._pageSize = 20;
  }

  getApiUri() {
    return this._apiUri;
  }

  getPageSize() {
    return this._pageSize;
  }
}
