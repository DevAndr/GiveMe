import React, {FC, useContext, useState, createContext, useLayoutEffect} from 'react';
import {getCookieAT} from '@/actions';

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

    useLayoutEffect(() => {
        const at = getCookieAT();
        if (at)
            setIsAuth(true);
        else
            setIsAuth(false);
    }, [])

    return (
        <AuthContext.Provider value={{isAuth}}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;