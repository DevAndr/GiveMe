'use client';

import {useSession} from 'next-auth/react';

const useFetch = () => {
    const {data: session} = useSession();



}