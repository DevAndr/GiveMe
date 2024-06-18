'use client'

import React, {FC} from 'react';
import SignInForm from '@/components/forms/signIn/SignInForm';
import {Button} from '@nextui-org/react';
import {getWishLists} from '@/services/WishListService';

interface PageProps {

}

const Page: FC<PageProps> = ({}) => {

    function fetchHandle() {
        getWishLists().then(res => {
            console.log(res);
        });
    }

    return (
        <div>
            <SignInForm/>
            <Button onClick={fetchHandle}>Fetch</Button>
        </div>
    );
};

export default Page;