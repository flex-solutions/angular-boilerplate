const CustomerMessageConst = {};

const CustomerRouteNames = {
  CREATE: 'customers/create',
  EDIT: 'customers/update/',
  NEWS_HOME: 'customers',
  VIEW: 'customers/detail/'
};

const CustomerErrors = {
  Create_Customer_Sucess: 'customer-create_edit_customer-create_customer_ok',
  Edit_Customer_Sucess: 'customer-create_edit_customer-edit_customer_ok',
  EmailInvalid: 'customer-create_edit_customer-email_invalid',
};

const MemberTypeRoute = {
  CREATE: './create',
  UPDATE: './update/'
};

export {
  CustomerMessageConst,
  CustomerRouteNames,
  CustomerErrors,
  MemberTypeRoute
};
