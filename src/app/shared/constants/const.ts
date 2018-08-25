const DefaultUserGroup = {
    ADMINISTRATORS: 'snob-cms-administrators',
    USERS: 'snob-cms-users'
};

const DefaultPermissionScheme = {
    ADMINISTRATOR: 'default-admin-permission-scheme',
    USER: 'default-user-permission-scheme'
};

const ModuleRoute = {
    USER: 'users',
    USER_GROUP: 'user-groups',
    PERMISSION_SCHEMES: 'permission-schemes',
    NEWS: 'news',
    PROMOTION: 'promotions',
    MEMBER: 'members',
    MEMBERSHIP_TYPE: 'membership-type',
    VOUCHER : 'voucher'
};

const PagingDefault = {
    ITEM_PER_PAGE: -1
};

export { DefaultUserGroup, DefaultPermissionScheme, ModuleRoute, PagingDefault };
