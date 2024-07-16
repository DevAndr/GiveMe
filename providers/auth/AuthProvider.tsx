'use client'

import React, {FC, useContext, useState, createContext, useLayoutEffect} from 'react';
import {getCookieAT} from '@/actions';
import {useLazyQuery, useQuery} from '@apollo/client';
import {IS_AUTH} from '@/graphql';

type AuthContextType = {
    isAuth: boolean;
}

export const AuthContext = createContext<AuthContextType>({
    isAuth: false
});

interface AuthProviderProps {
    children: React.ReactNode;
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

const AuthProvider: FC<AuthProviderProps> = ({children}) => {
    const [isAuth, setIsAuth] = useState<boolean>(false);
    // const {data} = useQuery(IS_AUTH)
    const [fetch, {data, error}] = useLazyQuery(IS_AUTH)

    useLayoutEffect(() => {
        fetch().then((res) => {
            if (res.data.checkAuth.isAuth) {
                setIsAuth(true);
            }
        }).catch(e => {
            setIsAuth(false);
        })

        // const at = getCookieAT();
        // console.log(at);
        // if (at)
        //     setIsAuth(true);
        // else
        //     setIsAuth(false);
    }, [])

    return (
        <AuthContext.Provider value={{isAuth}}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;