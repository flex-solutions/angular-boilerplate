class ControllerModel {
    _id: string;

    code: string;

    name: string;
}

class ControllerSelectedItem {

    is_check: Boolean;

    controller: ControllerModel;
}

class PermissionDetail {
    controller_name: String;
    controller_id: string;
    is_insert: Boolean;
    is_update: Boolean;
    is_delete: Boolean;
    data_scope: DataScope;
}

enum DataScope {
    Branch = 0,
    Full = 1,
}
export{ ControllerSelectedItem, ControllerModel, PermissionDetail, DataScope};

