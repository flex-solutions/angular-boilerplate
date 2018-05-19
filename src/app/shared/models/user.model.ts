export interface IUser {
  id: string;
  email: string;
  fullname: string;
  username: string;
  password: string;
  isLocked: boolean;
  avatar: string;
  loginAttempts: number;
}

export class User implements IUser {
  loginAttempts: number;
  id: string;
  email: string;
  fullname: string;
  username: string;
  password: string;
  isLocked: boolean;
  avatar: string;
}
