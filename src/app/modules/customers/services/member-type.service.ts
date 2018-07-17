import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AbstractRestService } from '../../../shared/abstract/abstract-rest-service';
import { MemberType } from '../../../shared/models/member-type.model';
import { Response } from '@angular/http';

@Injectable()
export class MemberTypeService extends AbstractRestService {
  protected controllerName: string;
  constructor() {
    super();
    this.controllerName = 'member-type';
  }

  getMemberTypes(): Observable<MemberType[]> {
    return this.get<MemberType[]>();
  }

  getMemberType(id: string): Observable<MemberType> {
    return this.get<MemberType>(`${id}`);
  }

  create(dto: MemberType): Observable<Response> {
    return this.post('', dto);
  }

  update(dto: MemberType): Observable<Response> {
    return this.put('', dto);
  }

  deleteMemberType(id: string): Observable<Response> {
    return this.delete(id);
  }
}
