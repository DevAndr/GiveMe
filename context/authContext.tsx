import React, {createContext, useContext, useEffect, useState} from "react";
import {ITokens} from "../services/graphql/types";
import AuthService from "../services/auth.service";
import {useRouter} from "next/router";
import {useGetTokens} from "../services/graphql";
import {useAppDispatch} from "../redux/hooks";
import {setAuth} from "../redux/reducers/auth.slice";

//роуты для общего доступа
const publicPaths = ['auth', 'viewList', ''];// авторизация, просмотр списка, лэндинг

export type AuthContextType = Partial<ITokens> & {
    isAuth: boolean
    updateStateAuth?: (valueAuth: boolean) => void
    isPublic: boolean
    uidUser?: string
}

const initial: AuthContextType = {
    isAuth: false,
    isPublic: false
}

interface IProvider {
    children?: JSX.Element | JSX.Element[];
}

export const AuthContext = createContext<AuthContextType>(initial)

const AuthProvider = ({children}: IProvider) => {
    const router = useRouter();
    const dispatch = useAppDispatch()
    const [getTokens] = useGetTokens()
    const [isAuth, setIsAuth] = useState<boolean>(false)
    const [isPublic, setIsPublic] = useState<boolean>(false)

    useEffect(() => {
        checkAuth(router.asPath)

        // if (isAuth && router.asPath.split('/')[1] === "") {
        //     router.push('/lists')
        // }
    }, [])

    const checkAuth = async (url: string) => {
        const path = url.split('/')[1]
        const isPublicPath = publicPaths.includes(path)

        setIsPublic(isPublicPath)

        let {at, rt} = AuthService.getLocalTokens();
        let isExistsTokens = (at && rt)
        let isAuthCheck = false

        if (isExistsTokens) {
            const checkAt = AuthService.isGodAccessToken()

            if (!checkAt) {
                const checkRt = AuthService.isGodRefreshToken()

                if (checkRt) {
                    //get refresh token
                    const {data} = await getTokens()

                    if (data?.refresh.access_token) {
                        isAuthCheck = true
                    }
                }
            } else {
                isAuthCheck = true
            }
        }

        if (isAuthCheck){
            // router.push('/lists')
            dispatch(setAuth(true))
            setIsPublic(true)
            return

        } else if (!isAuthCheck && !isPublicPath) {
            router.push('/auth')
            setTimeout(() => {
                setIsPublic(true)
            }, 500)
            return
        }
    }

    const signIn = () => {

    }

    const signUp = () => {

    }

    const logOut = () => {

    }

    const updateStateAuth = (valueAuth: boolean) => {
        setIsAuth(valueAuth)
        // router.push('/')
    }

    return (
        <AuthContext.Provider value={{isAuth, updateStateAuth, isPublic}}>
            {isPublic ? children : isPublic && isAuth && children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext)
}

export default AuthProvider
