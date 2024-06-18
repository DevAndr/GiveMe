import React, {FC} from 'react';
import './styles.scss'

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: FC<LayoutProps> = ({children}) => {
    return (
        <main className='auth-layout'>
            {children}
        </main>
    );
};

export default Layout;