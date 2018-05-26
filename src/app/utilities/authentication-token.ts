import { AuthenticationResponse } from '../shared/models/authentication.model';
import { appVariables } from '../app.constant';
import { BasicUserInfo } from '../shared/models/user.model';

export class AuthenticationTokenHelper {
    static saveTokenInCookie(tokenResponse: AuthenticationResponse) {
        localStorage.setItem(appVariables.accessTokenLocalStorage, tokenResponse.token);
        localStorage.setItem(appVariables.accessTokenExpireTime, tokenResponse.expireTime.toString());
        localStorage.setItem(appVariables.accessRefreshToken, tokenResponse.refreshToken.toString());
        localStorage.setItem(appVariables.accessTokenOwner, JSON.stringify(tokenResponse.user));
    }

    static removeTokenInCookie() {
        localStorage.removeItem(appVariables.accessTokenLocalStorage);
        localStorage.removeItem(appVariables.accessTokenExpireTime);
        localStorage.removeItem(appVariables.accessRefreshToken);
        localStorage.removeItem(appVariables.accessTokenOwner);
        localStorage.removeItem(appVariables.accessTokenOwner);
    }

    static get localToken() {
        return localStorage.getItem(appVariables.accessTokenLocalStorage);
    }

    static get expireTime() {
        return localStorage.getItem(appVariables.accessTokenExpireTime);
    }

    static get refreshToken() {
        return localStorage.getItem(appVariables.accessRefreshToken);
    }

    static get localUserInfo(): BasicUserInfo {
        const userInfo = localStorage.getItem(appVariables.accessTokenOwner);
        if (userInfo) {
            try {
                const localUser = JSON.parse(userInfo);
                return localUser as BasicUserInfo;
            } catch {
                return null;
            }
        }
    }
}
