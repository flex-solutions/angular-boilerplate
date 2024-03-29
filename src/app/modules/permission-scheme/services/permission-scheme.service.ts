import {
    AbstractRestService
} from '../../../shared/abstract/abstract-rest-service';
import {
    ControllerModel,
    PermissionScheme,
    IPermissionScheme,
    IPermissionSchemeDetail
} from '../../../shared/models/permission-scheme.model';
import {
    Observable
} from 'rxjs';
import {
    SchemeCommonConst,
    PermissionEndPoints
} from '../permission-scheme-const';

export class PermissionSchemeServcie extends AbstractRestService {

    protected controllerName: string;

    constructor() {
        super();
        this.controllerName = SchemeCommonConst.Controller;
    }

    getAllController(): Observable<ControllerModel[]> {
        return this.get(PermissionEndPoints.GetAllController);
    }

    addPermissionScheme(permissionSchemes: any) {
        return this.post('', permissionSchemes);
    }

    updatePermissionScheme(permissionSchemes: any) {
        return this.put('', permissionSchemes);
    }

    getPermissionSchemes(pageSize: number, pageNumber: number, searchKey?: string) {
        const query = `permission-schemes?searchKey=${searchKey}&pageSize=${pageSize}&pageNumber=${pageNumber}`;
        return this.get(query);
    }


    getPermissionDetails(id: string): Observable<any[]> {
        const query = `${id}/getControllers`;
        return this.get(query);
    }

    count(searchKey?: string) {
        const query = `count?searchKey=${searchKey}`;
        return this.get<number>(query);

    }

    clone(permissionSchemes: IPermissionScheme) {
        return this.post('clone', permissionSchemes);
    }

    findOneById(id): Observable<PermissionScheme> {
        return this.get(id);
    }
    getAllPermissionSchemes() {
        return this.get('');
    }

    updateSchemeForUserGroup(schemeId: string, userGroupsId: string[]) {
        const query = `updateSchemeForUserGroup/${schemeId}`;
        return this.put(query, userGroupsId);
    }

    getAllUserGroups() {
        return this.get('user-groups');
    }

    getPermissionSchemeDetail(id: any): Observable<IPermissionSchemeDetail[]> {
        return this.get(`${id}/getControllers`);
    }

    deleteScheme(id: any) {
        return this.delete(`${id}`);
    }
}
