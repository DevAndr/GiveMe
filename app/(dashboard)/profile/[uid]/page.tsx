import React, {FC} from 'react';

interface PageProps {
    params: {
        uid: string
    }
}

const Page: FC<PageProps> = ({params}) => {
    return (
        <div>
            Profile page {params.uid}
        </div>
    )
}

export default Page;