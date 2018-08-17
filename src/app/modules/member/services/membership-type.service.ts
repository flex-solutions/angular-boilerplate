import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AbstractRestService } from '../../../shared/abstract/abstract-rest-service';
import { MembershipType } from '../../../shared/models/membership-type.model';
import { Response } from '@angular/http';

@Injectable()
export class MembershipTypeService extends AbstractRestService {
  protected controllerName: string;
  constructor() {
    super();
    this.controllerName = 'membership-type';
  }

  getMembershipTypes(): Observable<MembershipType[]> {
    return this.get<MembershipType[]>();
  }

  getMembershipType(id: string): Observable<MembershipType> {
    return this.get<MembershipType>(`${id}`);
  }

  countMember(id: string): Observable<Number> {
    return this.get<Number>(`${id}/countMember`);
  }

  create(dto: MembershipType): Observable<Response> {
    return this.post('', dto);
  }

  update(dto: MembershipType): Observable<Response> {
    return this.put('', dto);
  }

  deleteMembershipType(id: string, newTypeId: string): Observable<Response> {
    return this.delete(`${id}?newTypeId=${newTypeId}`);
  }
}
