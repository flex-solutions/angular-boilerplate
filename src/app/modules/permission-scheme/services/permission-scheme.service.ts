import { AbstractRestService } from '../../../shared/abstract/abstract-rest-service';
import { ControllerModel, PermissionScheme } from '../../../shared/models/permission-scheme.model';
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
}
