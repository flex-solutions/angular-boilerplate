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
    GetAllController: 'controllers',
};

const PermissionNavigationRoute = {
    EDIT_PAGE: 'permission-schemes/edit/',
    CREATE_PAGE: 'permission-schemes/create',
    LIST_PAGE: 'permission-schemes'
};

export {
    IgnoreField, NotificationConst,
    SchemeCommonConst, SchemeField,
    PermissionEndPoints, PermissionNavigationRoute };
