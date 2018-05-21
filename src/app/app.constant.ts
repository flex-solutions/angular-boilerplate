export const appVariables = {
  userLocalStorage: 'user',
  resourceAccessLocalStorage: 'resourceAccessRaw',
  accessTokenServer: 'X-Auth-Token',
  defaultContentTypeHeader: 'application/json',
  loginPageUrl: '/login',
  registrationPageUrl: '/register',
  errorInputClass: 'has-error',
  successInputClass: 'has-success',
  actionSearchKey: 'Entity',
  resourceActions: {
    getActionName: 'Read',
    addActionName: 'Create',
    updateActionName: 'Update',
    deleteActionName: 'Delete'
  },
  rateUnits: [
    { id: 1, name: 'Hourly' },
    { id: 2, name: 'Monthly' },
    { id: 3, name: 'Annually' }
  ],
  defaultAvatarUrl: 'default_user',
  defaultDdlOptionValue: '-1',
  defaultDdlOptionText: 'Select',
  defaultStateDdlOptionText: 'Select State',
  defaultCityDdlOptionText: 'Select City',
  defaultClientDdlOptionText: 'Select Client',
  defaultRateUnitDdlOptionText: 'Select Unit',
  ng2SlimLoadingBarColor: 'red',
  ng2SlimLoadingBarHeight: '4px',
  accessTokenLocalStorage: 'accessToken',
  accessTokenExpireTime: 'expireTime',
  resourceNameIdentifier: 'Entity',
  docViewerurl: 'http://docs.google.com/gview?url=',
  msOfficeDocViewerPath: 'https://view.officeapps.live.com/op/embed.aspx?src=',
  goodleDocViewerPath: url => {
    return `http://docs.google.com/gview?url=${url}&embedded=true`;
  }
};
