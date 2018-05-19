export interface IUser {
  id: string;
  email: string;
  fullname: string;
  username: string;
  password: string;
  isActive: boolean;
  avatar: string;
}

export class User implements IUser {
  id: string;
  email: string;
  fullname: string;
  username: string;
  password: string;
  isActive: boolean;
  avatar: string;
}
