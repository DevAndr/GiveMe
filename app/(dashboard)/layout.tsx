import React, {FC} from 'react';
import NavBar from '@/components/Navbar/NavBar';
import Footer from "@/components/Footer/Footer";
import './styles.scss'

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: FC<LayoutProps> = ({children}) => {
    return (
        <div className='dashboard-layout'>
            <NavBar/>
            <main>
                {children}
            </main>
            <Footer/>
        </div>
    );
};

export default Layout;