// 'use client'

import React, {FC} from 'react'; 
import WishLists from '@/components/wishLists/WishLists';

interface PageProps {

}

const Page: FC<PageProps> = async ({}) => {


    return (
        <div>
            <h1>wish lists</h1>
            <WishLists/>
        </div>
    );
};

export default Page;