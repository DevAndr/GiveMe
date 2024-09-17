import React, {FC, ReactNode} from 'react';
import Footer from '@/components/footer/Footer';
import AppBar from '@/components/appBar/AppBar';
import './styles.scss'

interface PublicLayoutProps {
    children: ReactNode;
}

const PublicLayout: FC<PublicLayoutProps> = ({children}) => {
    return (
        <div className='public-layout'>
            <header>
                <AppBar/>
            </header>
            <main className="content">
                {children}
            </main>
            <Footer/>
        </div>
    );
};

export default PublicLayout;