import React, {createContext, FC, ReactNode, useContext, useEffect, useState} from "react";
import {ITokens} from "../services/graphql/types";
import AuthService from "../services/auth.service";
import { useRouter } from "next/router";
import {useGetTokens} from "../services/graphql";

//роуты для общего доступа
const publicPaths = ['auth', 'viewList', ''];// авторизация, просмотр списка, лэндинг

type AuthContext = Partial<ITokens> & {
    value: any
    isAuth: boolean
    isPublic: boolean
    uidUser?: string
}

const initial: AuthContext = {
    value: "",
    isAuth: false,
    isPublic: false
}

const AuthContext = createContext<AuthContext | null>(initial)

const AuthProvider: FC<any> = ({children}) => {
    const router = useRouter();
    const [getTokens] = useGetTokens()
    const [value, setValue] = useState("")
    const [isAuth, setIsAuth] = useState<boolean>(false)
    const [isPublic, setIsPublic] = useState<boolean>(false)

    useEffect(() => {
        checkAuth(router.asPath)
    }, [])

    const checkAuth = async (url: string) => {
        const path = url.split('/')[1]
        const isPublicPath = publicPaths.includes(path)

        setIsPublic(isPublicPath)

        let {at, rt} = AuthService.getLocalTokens();
        let isAuthCheck = (at && rt)

        if (isAuthCheck) {
            const checkAt = AuthService.isExpirationAccessToken()

            if (!checkAt) {
                const checkRt = AuthService.isExpirationRefreshToken()

                if (checkRt) {
                    //get refresh token
                    const {data} = await getTokens()

                    if (data?.refresh) {
                        console.log(data?.refresh)
                        setIsAuth(true)
                    }
                } else {
                    setIsAuth(false)
                }
            } else {
                setIsAuth(true)
            }
        }

        if (!isPublicPath && !isAuthCheck) {
            router.push('/auth')
            setTimeout(() => {
                setIsPublic(true)
            }, 500)
        } else {
            setTimeout(() => {
                setIsPublic(true)
                setIsAuth(true)
            }, 500)
        }
    }

    const signIn = () => {

    }

    const signUp = () => {

    }

    const logOut = () => {

    }

    return (
        <AuthContext.Provider value={{value, isAuth, isPublic}}>
            {isPublic ? children : isPublic && isAuth && children}
        </AuthContext.Provider>
    )
}

const useAuth = () => useContext(AuthContext);
export {AuthProvider as default, useAuth};
