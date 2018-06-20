const UserNavigationRoute = {
    EDIT_GROUP_PAGE: '.usergroup/update',
    CREATE_PAGE: 'users/create/',
    EDIT_USER_PAGE: 'users/edit/',
    USER_DETAIL_PAGE: 'users/user/',
    USERS_PAGE: 'users',
    GROUPS_PAGE: 'user-groups',
    SCHEME_DETAIL_PAGE: 'scheme-detail'
};

const UserMessages = {
    CreateUserSuccessfull: 'user-create_user-notification-create_user_successfully',
    EditUserSuccessfull: 'user-edit_user-notification-edit_user_successfully',
    DeleteUserMessage: 'user-detail-delete-message',
    ChangeUserGroupMessage: 'user-change-group-message',
    ChangeUserGroupPlaceHolder: 'group-user-modal-search-place-holder',
    ChangePasswordSuccessFully: 'change-password-notification-changed-successfully',
    CurrentPasswordIsIncorrect: 'change-password-passowrd-incorect',
    ChangeGroupSuccess: 'group-user-modal-change-user-success'
};

export { UserNavigationRoute, UserMessages };
