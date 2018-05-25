import { BasicUserInfo } from './user.model';

export interface AuthenticationResponse {
  user: BasicUserInfo;
  token: string;
  expireTime: number;
  refreshToken: string;
}
