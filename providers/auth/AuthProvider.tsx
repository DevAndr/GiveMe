import React, {FC, useContext, useState, createContext, useLayoutEffect} from 'react';
import SignUpDialog from "@/components/dialog/SignUpDialog";
import SignInDialog from "@/components/dialog/SignInDialog";

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
        const at = true;
        if (at)
            setIsAuth(true);
        else
            setIsAuth(false);
    }, []);

    const showSigInDialog = () => {}
    const showSigUpDialog = () => {}

    return (
        <AuthContext.Provider value={{isAuth}}>
            {children}
            <SignUpDialog/>
            <SignInDialog/>
        </AuthContext.Provider>
    );
};

export default AuthProvider;