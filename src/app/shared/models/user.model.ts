export interface BasicUserInfo {
  _id: string;

  email: string;

  fullname: string;

  username: string;

  avatar: string;

  branch_id: string;

  userGroup?: {};
}

export class User implements BasicUserInfo {
  _id: string;

  email: string;

  fullname: string;

  username: string;

  password: string;

  isActive: boolean;

  avatar: string;

  position: string;

  // the current login failed attempt
  loginAttempts = 0;

  // total count of success log in
  successLoginCount = 0;

  // the last login time to system
  lastTimeLogin = 0;

  // the previous login time of last login
  previousTimeLogin = 0;

  // the last time of login fail
  lastTimeFailedLogin = 0;

  // total count of fail log in
  failedLoginCount = 0;

  // branch id
  branch_id: string;

  // Id of branch
  branch: string;

  // The group user belong to
  userGroup?: {
    _id: any;
    name: string;
  };
}

export class SignedUser {

  usertoken: string;

  username: string;

  password: string;
}

export class ChangePasswordModel {
  old_password: string;
  new_password: string;
}
