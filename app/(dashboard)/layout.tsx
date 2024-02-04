import React, {FC, ReactNode} from 'react';
import './style.scss';
import AppBar from "@/components/appBar/AppBar";
import Footer from "@/components/footer/Footer";
import DashboardMenu from "@/components/menu/DashboardMenu";

interface DashboardLayoutProps {
    children: ReactNode
}

const DashboardLayout: FC<DashboardLayoutProps> = ({children}) => {
    return (
        <div className='dashboardLayout'>
            <header>
                <AppBar/>
            </header>
            <main className='flex min-h-screen flex-row flex-col p-4 content'>
                <nav className='min-h-screen navigation'>
                  <DashboardMenu/>
                </nav>
                <div className='flex-auto flex justify-content-center'>
                    {
                        children
                    }
                </div>
            </main>
            <Footer/>
        </div>
    )
}

export default DashboardLayout;