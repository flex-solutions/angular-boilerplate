import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable()
export class ApplicationConfigurationService {
  private _apiURI: string;
  private _pageSize: number;

  constructor() {
    this._apiURI = environment.host;
    this._pageSize = 20;
  }

  getApiURI() {
    return this._apiURI;
  }

  getPageSize() {
    return this._pageSize;
  }
}
