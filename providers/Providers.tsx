'use client'

import React, {FC} from 'react';
import AuthProvider from '@/providers/auth/AuthProvider';
import {NextUIProvider} from '@nextui-org/react';

interface ProvidersProps {
    children: React.ReactNode;
}

const Providers: FC<ProvidersProps> = ({children}) => {
    return (
        <AuthProvider>
            <NextUIProvider>
            {children}
            </NextUIProvider>
        </AuthProvider>
    );
};

export default Providers;