import React, {FC, ReactNode} from 'react';

interface DashboardLayoutProps {
    children: ReactNode
}

const DashboardLayout: FC<DashboardLayoutProps> = ({children}) => {
    return (
        <>
            {
                // <header></header> optional
            }
            <nav></nav>
            <main className='flex min-h-screen flex-col items-center justify-center'>
                {
                    children
                }
            </main>
            {
                // <footer></footer> optional
            }
        </>
    )
}

export default DashboardLayout;