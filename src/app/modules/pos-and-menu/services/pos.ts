import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AbstractRestService } from '../../../shared/abstract/abstract-rest-service';
import { POSDto } from '../../../shared/models/pos.model';
import { MenuItemDto, MenuItemTypeDto } from '../../../shared/models/menu.model';

@Injectable()
export class POSService extends AbstractRestService {

  protected controllerName: string;
  constructor() {
    super();
    this.controllerName = 'pos-and-menu';
  }

  public count(searchKey?: string): Observable<number> {
    return this.get(`count?searchKey=${searchKey}`);
  }

  public find(pageSize?: number, pageNumber?: number, searchKey?: string): Observable<POSDto[]> {
    return this.get(`?searchKey=${searchKey}&pageSize=${pageSize}&pageNumber=${pageNumber}`);
  }

  public findMenuItems(pageSize?: number, pageNumber?: number, searchKey?: string): Observable<MenuItemDto[]> {
    return this.get(`menu-items?searchKey=${searchKey}&pageSize=${pageSize}&pageNumber=${pageNumber}`);
  }

  public findMenuItemTypes(pageSize?: number, pageNumber?: number, searchKey?: string): Observable<MenuItemTypeDto[]> {
    return this.get(`menu-item-types?searchKey=${searchKey}&pageSize=${pageSize}&pageNumber=${pageNumber}`);
  }

  public synchronize() {
    return this.post('', null);
  }
}
