const NotificationConst = {
    CreateSuccessfully: 'permissiom-scheme-create-notification-createsuccessfully',
    EditSuccessfully: 'permissiom-scheme-create-notification-editsuccessfully',
};

const IgnoreField = {
    ControllerName: 'controller_name',
    IsFullControl: 'is_fullcontrol',
};

const SchemeCommonConst = {
    Controller: 'permission',
};

const SchemeField = {
    ControllerId: 'controller'
};

const PermissionEndPoints = {
    GetAllController: 'get_controllers',
};

const PermissionNavigationRoute = {
    EDIT_PAGE: 'permission-scheme/update',
    CREATE_PAGE: 'permission-scheme/create',
    LIST_PAGE: 'permission-scheme'
};

export {
    IgnoreField, NotificationConst,
    SchemeCommonConst, SchemeField,
    PermissionEndPoints, PermissionNavigationRoute };
