import { UserGroup } from './user-group.model';

class ControllerSelectedItem {

    is_check: Boolean;

    is_disable: Boolean;

    controller: ControllerModel;
}

class SchemeDataSource {
    is_check_all: Boolean;
    data: ControllerSelectedItem[];
}

class ControllerModel {
    _id: string;

    code: string;

    name: string;
}

class PermissionDetail {
    controller_name: String;
    controller: string;
    is_insert: Boolean;
    is_update: Boolean;
    is_delete: Boolean;
    is_fullcontrol: Boolean;
    data_scope: DataScope;
}

interface IPermissionSchemeDetail {
    controller: {
        _id: any;
        code: string;
        name: string;
    };
    data_scope: DataScope;
    is_delete: boolean;
    is_insert: boolean;
    is_update: boolean;
}

class PermissionScheme {
    id: any;
    name: string;
    permission_details: PermissionDetail[];
}

enum DataScope {
    Branch = 0,
    Full = 1,
}


interface IPermissionScheme {
    _id: any;
    name: string;
    userGroups: UserGroup[];
}

export {
    ControllerSelectedItem, ControllerModel,
    PermissionDetail, PermissionScheme, DataScope, SchemeDataSource, IPermissionScheme, IPermissionSchemeDetail
};

