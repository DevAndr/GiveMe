import React, {FC, ReactNode} from 'react';
import './style.scss';
import AppBar from "@/components/appBar/AppBar";
import Footer from "@/components/footer/Footer";
import DashboardMenu from "@/components/menu/DashboardMenu";
import Content from '@/components/wrapper/Content';

interface DashboardLayoutProps {
    children: ReactNode;
    // hideAppBar?: boolean;
}

const DashboardLayout: FC<DashboardLayoutProps> = ({children,}) => {

    return (
        <div className="dashboardLayout">
            <header>
                <AppBar/>
            </header>
            <main className="main">
                <nav className="navigation">
                    <DashboardMenu/>
                </nav>

                <Content typeView={'fullScreenInTop'}>
                    {children}
                </Content>
            </main>
            <Footer/>
        </div>
    );
};

export default DashboardLayout;