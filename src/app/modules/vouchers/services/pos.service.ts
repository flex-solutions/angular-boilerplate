import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AbstractRestService } from '../../../shared/abstract/abstract-rest-service';
import { POSDto } from '../../../shared/models/pos.model';

@Injectable()
export class POSService extends AbstractRestService {

  protected controllerName: string;
  constructor() {
    super();
    this.controllerName = 'pos';
  }

  public count(searchKey?: string): Observable<number> {
    return this.get(`count?searchKey=${searchKey}`);
  }

  public find(pageSize?: number, pageNumber?: number, searchKey?: string): Observable<POSDto[]> {
    return this.get(`?searchKey=${searchKey}&pageSize=${pageSize}&pageNumber=${pageNumber}`);
  }
}
