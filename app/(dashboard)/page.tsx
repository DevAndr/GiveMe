'use client';

import {useEffect} from 'react';
import useAxiosAuth from '@/hooks/useAxiosAuth';
import {Button} from '@nextui-org/react';

export default function Home() {
    const axios = useAxiosAuth();

    const fetchLists = () => {
        axios.get('/wish-list/lists').then(res => {
            console.log(res.data);
        }).catch(error => {
            console.log(error);
        });
    }

    useEffect(() => {
        fetchLists();
    }, [axios]);

    return (
        <div>
            Home
            <Button onClick={fetchLists}>Fetch</Button>
        </div>
    );
}
