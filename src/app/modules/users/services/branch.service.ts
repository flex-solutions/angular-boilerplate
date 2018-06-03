import { AbstractRestService } from '../../../shared/abstract/abstract-rest-service';
import { Branch } from '../../../shared/models/branch.model';

export class BranchService extends AbstractRestService {
    protected controllerName: string;

    constructor() {
        super();
        this.controllerName = 'branch';
    }

    getAll() {
        return this.get<Branch[]>();
    }
}
