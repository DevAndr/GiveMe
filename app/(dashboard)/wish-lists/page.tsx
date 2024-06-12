// 'use client'

import React, {FC} from 'react';
import SignUpDialog from '@/components/dialog/SignUpDialog';
import SignInDialog from '@/components/dialog/SignInDialog';

interface PageProps {

}

const Page: FC<PageProps> = async ({}) => {

    return (
        <div>
            <h1>wish lists</h1>
            <ul>
                {
                   // Array(100).fill(null).map((_, index) => (<li key={index}>{index}</li>))
                }
            </ul>
            {/*<SignUpDialog/>*/}
            <SignInDialog/>
        </div>
    );
};

export default Page;