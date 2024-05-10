import {useEffect, useState} from 'react';
import {useLazyQuery} from '@apollo/client';
import {ResponseCreateOrGetSender, ResponseGetUser} from '@/graphql/types';
import {GET_OR_CREATE_SENDER} from '@/graphql';

const useSender = () => {
    const [fetchCreateOrGet, {data, loading}] = useLazyQuery<ResponseCreateOrGetSender>(GET_OR_CREATE_SENDER);
    const [senderId, setSenderId] = useState<string | undefined>(undefined);

    useEffect(() => {
        const id = window.localStorage.getItem('senderId');

        if (id) {
            setSenderId(id);
        } else {
            fetchCreateOrGet().then(res => {
                const id = res.data?.getOrCreateSender.id;

                if (id) {
                    setSenderId(id);
                    window.localStorage.setItem('senderId', id);
                }
            });
        }
    }, []);

    return {senderId};
};

export default useSender;