import { AbstractRestService } from '../../../shared/abstract/abstract-rest-service';
import { ControllerModel } from '../../../shared/models/controller.model';
import { Observable } from 'rxjs';

export class PermissionSchemeServcie extends AbstractRestService {

    protected controllerName: string;

    constructor() {
        super();
        this.controllerName = 'Permission Scheme';
    }

    getAllController(): Observable<ControllerModel[]> {
        return this.get('/permission/get_controllers');
    }
}
