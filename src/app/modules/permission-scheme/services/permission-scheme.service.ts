import { AbstractRestService } from '../../../shared/abstract/abstract-rest-service';
import { ControllerModel, PermissionScheme, IPermissionScheme } from '../../../shared/models/permission-scheme.model';
import { Observable } from 'rxjs';
import { SchemeCommonConst, PermissionEndPoints } from '../permission-scheme-const';

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

    getPermissionSchemes(pageSize: number, pageNumber: number, searchKey?: string) {
        const query = `permission-schemes?searchKey=${searchKey}&pageSize=${pageSize}&pageNumber=${pageNumber}`;
        return this.get(query);
    }

    count(searchKey?: string) {
        const query = `count?searchKey=${searchKey}`;
        return this.get<number>(query);
    }

    clone(permissionSchemes: IPermissionScheme) {
        return this.post('clone', permissionSchemes);
    }
}
