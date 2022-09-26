import { getCookie } from 'cookies-next';

interface ILocalTokens {
    at?: string | null | undefined
    rt?: string | null | undefined
}

class AuthService {

    getCookieApp(name: string) {
        return getCookie(name)
    }

    checkAuth() {
        const at = this.getCookieApp('access_token')
        const rt = this.getCookieApp('refresh_token')

        console.log('checkAuth', at, rt)



        return true
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
