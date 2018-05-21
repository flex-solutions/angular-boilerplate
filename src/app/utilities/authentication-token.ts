import { Authentication } from '../shared/models/authentication.model';
import { appVariables } from '../app.constant';

export class AuthenticationTokenHelper {
    static saveTokenInCookie(tokenResponse: Authentication, username?: string) {
        localStorage.setItem(appVariables.accessTokenLocalStorage, tokenResponse.token);
        localStorage.setItem(appVariables.accessTokenExpireTime, tokenResponse.expireTime.toString());
        localStorage.setItem(appVariables.accessRefreshToken, tokenResponse.refreshToken.toString());

        if (username) {
            localStorage.setItem(appVariables.accessTokenOwner, username);
        }
    }

    static clearTokenInCookie() {
        localStorage.removeItem(appVariables.accessTokenLocalStorage);
        localStorage.removeItem(appVariables.accessTokenExpireTime);
        localStorage.removeItem(appVariables.accessRefreshToken);
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

    static get username() {
        return localStorage.getItem(appVariables.accessTokenOwner);
    }
}
