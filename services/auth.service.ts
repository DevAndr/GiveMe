import {getCookie} from 'cookies-next';
import {decodeJwt} from "jose";

interface ILocalTokens {
    at?: string | null | undefined
    rt?: string | null | undefined
}

type Token = string | null | undefined

type isExpirationToken = (token: Token) => boolean

const isExpiration: isExpirationToken = (token) => {
    if (token) {
        const decode = decodeJwt(token)
        const timeRemaining = decode?.exp ? decode.exp * 1000 : 0
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

    isGodAccessToken(): boolean {
        const at = this.getCookieApp('access_token')

        if (typeof at === "boolean")
            return false

        return !isExpiration(at)
    }

    isGodRefreshToken(): boolean {
        const rt = this.getCookieApp('refresh_token')
        if (typeof rt === "boolean")
            return false

        return !isExpiration(rt)
    }

    getLocalTokens() {
        const at = this.getCookieApp('access_token')
        const rt = this.getCookieApp('refresh_token')
        return {
            at,
            rt
        }
    }

    refreshTokens() {

    }
}

export default new AuthService
