import React, {FC} from 'react';
import {useAuth} from '@/providers/auth/AuthProvider';
import {redirect} from 'next/navigation';

interface WithAuthProps {
    children: React.ReactNode;
}

const WithAuth: FC<WithAuthProps> = ({children}) => {
    const {isAuth} = useAuth();

    if (!isAuth) {
        redirect('/auth');
    }

    return (
        <>
            {children}
        </>
    );
};

export default WithAuth;