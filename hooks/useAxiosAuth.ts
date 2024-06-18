'use client';

import {useSession} from 'next-auth/react';
import {useEffect} from 'react';
import {apiAuth} from '@/lib/axiosInstance';

export const useAxiosAuth = () => {
    const {data: session} = useSession();

    useEffect(() => {
        let requestInterceptor: any;

        if (session) {
            requestInterceptor = apiAuth.interceptors.request.use((config) => {
                if (!config.headers['Authorization']) {
                    config.headers['Authorization'] = `Bearer ${session?.tokens.accessToken}`;
                }

                console.log('useAxiosAuth', config.headers);

                return config;
            });
        }

        return () => {
            apiAuth.interceptors.request.eject(requestInterceptor);
        };
    }, [session]);

    return apiAuth;
};

export default useAxiosAuth;