import React, {FC} from 'react';
import NavBar from '@/components/Navbar/NavBar';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: FC<LayoutProps> = ({children}) => {
    return (
        <div>
            <NavBar/>
            <main>
                {children}
            </main>
            <footer>

            </footer>
        </div>
    );
};

export default Layout;