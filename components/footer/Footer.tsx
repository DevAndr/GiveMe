import React, {FC, ReactNode} from 'react';

interface FooterProps {
    children?: ReactNode
}

const Footer: FC<FooterProps> = ({children}) => {
    return (
        <footer className='p-4'>
            {children ? children : <>
                <p>Footer</p>
            </>}
        </footer>
    );
}

export default Footer;