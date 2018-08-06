const MemberMessageConst = {};

const MemberRouteNames = {
  CREATE: 'members/create',
  EDIT: 'members/update/',
  NEWS_HOME: 'members',
  VIEW: 'members/detail/'
};

const MemberErrors = {
  Create_Member_Sucess: 'member-create_edit_member-create_member_ok',
  Edit_Member_Sucess: 'member-create_edit_member-edit_member_ok',
  EmailInvalid: 'member-create_edit_member-email_invalid',
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
