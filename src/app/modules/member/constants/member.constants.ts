const MemberMessageConst = {};

const MemberRouteNames = {
  CREATE: 'members/create',
  EDIT: 'members/update/',
  NEWS_HOME: 'members',
  VIEW: 'members/detail/'
};

const MemberErrors = {
  Create_Member_Sucess: 'customer-create_edit_customer-create_customer_ok',
  Edit_Member_Sucess: 'customer-create_edit_customer-edit_customer_ok',
  EmailInvalid: 'customer-create_edit_customer-email_invalid',
};

const MembershipTypeRoute = {
  CREATE: './create',
  UPDATE: './update/'
};

export {
  MemberMessageConst,
  MemberRouteNames,
  MemberErrors,
  MembershipTypeRoute
};
