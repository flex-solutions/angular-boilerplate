export interface BasicUserInfo {
  _id: string;

  email: string;

  fullname: string;

  username: string;

  avatar: string;

  branch_id: string;

  userGroup?: string;
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

  // Name of group user belong to.
  groupname: string;

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

  // User group
  userGroup?: string;
}

export class SignedUser {

  usertoken: string;

  username: string;

  password: string;
}
