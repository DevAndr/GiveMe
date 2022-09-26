import {getCookie } from 'cookies-next';
import {decodeJwt} from "jose";

interface ILocalTokens {
    at?: string | null | undefined
    rt?: string | null | undefined
}

type Token = string | null | undefined

type isExpirationToken = (token: Token) => boolean

const isExpiration: isExpirationToken = (token) => {
    if (token) {
        const timeRemaining = decodeJwt(token)?.exp * 1000
        return timeRemaining < Date.now()
    }

    return true
}

class AuthService {

    getCookieApp(name: string) {
        return getCookie(name)
    }

    checkAuth() {
        const at = this.getCookieApp('access_token')
        const rt = this.getCookieApp('refresh_token')

        return true
    }

    isExpirationAccessToken(): boolean {
        const at = this.getCookieApp('access_token')
        if (typeof at === "boolean")
            return true

        return isExpiration(at)
    }

    isExpirationRefreshToken(): boolean {
        const rt = this.getCookieApp('refresh_token')
        if (typeof rt === "boolean")
            return true

        return isExpiration(rt)
    }

    getLocalTokens() {
        const at = this.getCookieApp('access_token')
        const rt = this.getCookieApp('refresh_token')
        return {
            at,
            rt
        }
    }
}

export default new AuthService
