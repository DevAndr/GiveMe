// 'use client'

import React, {FC} from 'react';

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
        </div>
    );
};

export default Page;