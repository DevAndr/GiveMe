'use client'

import React, {FC} from 'react';
import AuthProvider from '@/providers/auth/AuthProvider';
import {NextUIProvider} from '@nextui-org/react';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import {SessionProvider} from 'next-auth/react';

interface ProvidersProps {
    children: React.ReactNode;
}

const Providers: FC<ProvidersProps> = ({children}) => {
    // const client = new QueryClient()
    const [queryClient] = React.useState(() => new QueryClient())

    return (
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <NextUIProvider>
                    <SessionProvider>
                    {children}
                    </SessionProvider>
                </NextUIProvider>
            </AuthProvider>
            <ReactQueryDevtools initialIsOpen={false}/>
        </QueryClientProvider>
    );
};

export default Providers;