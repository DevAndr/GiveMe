
import React, {FC, useEffect} from 'react';
import {getWishLists} from '@/actions';
import {auth} from '@/auth';
import {WishList} from '@/api/types';

interface WishListsProps {

}

const WishLists: FC<WishListsProps> = async ({}) => {
    const session = await auth()

    console.log('session', session);

    const lists = await getLists();


    console.log('lists', lists);

    async function getLists() {
        const data = await fetch('http://localhost:3030/wish-list/lists', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${session?.tokens.accessToken}`
            }
        })

        return data.json();
    }

    if (!lists) {
        return <div>Пусто</div>
    }


    return (
        <ul>
            {
                lists.map((list: WishList) => {
                    return (
                        <li key={list.id}>{list.name} - {list.products.length}</li>
                    );
                })
            }
        </ul>
    );
};

export default WishLists;