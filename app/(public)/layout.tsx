import React, {FC, ReactNode} from 'react';
import Footer from '@/components/footer/Footer';
import AppBar from '@/components/appBar/AppBar';

interface PublicLayoutProps {
    children: ReactNode;
}

const PublicLayout: FC<PublicLayoutProps> = ({children}) => {
    return (
        <div className='public-layout'>
            <header>
                <AppBar/>
            </header>
            <main>
                {children}
            </main>
            <Footer/>
        </div>
    );
};

export default PublicLayout;