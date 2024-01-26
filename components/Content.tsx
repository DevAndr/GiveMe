import React, {FC, ReactNode} from 'react';

interface ContentProps {
    children: ReactNode
}

const Content: FC<ContentProps> = ({children}) => {
    return (
        <div className=''>
            {children}
        </div>
    )
}

export default Content;