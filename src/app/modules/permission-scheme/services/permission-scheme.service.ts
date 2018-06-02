import { AbstractRestService } from '../../../shared/abstract/abstract-rest-service';
import { ControllerModel, IPermissionSchemes } from '../../../shared/models/permission-scheme.model';
import { Observable } from 'rxjs';

export class PermissionSchemeServcie extends AbstractRestService {

    protected controllerName: string;

    constructor() {
        super();
        this.controllerName = 'permission';
    }

    getAllController(): Observable<ControllerModel[]> {
        return this.get('get_controllers');
    }

    getPermissionSchemes(pageSize: number, pageNumber: number, searchKey?: string) {
        const query = `permission-schemes?searchKey=${searchKey}&pageSize=${pageSize}&pageNumber=${pageNumber}`;
        return this.get(query);
    }

    count(searchKey?: string) {
        const query = `count?searchKey=${searchKey}`;
        return this.get<number>(query);
    }
}
