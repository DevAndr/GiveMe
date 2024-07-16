import React, {FC, useEffect, useRef, useState} from 'react';
import {Sidebar} from 'primereact/sidebar';
import {Menu} from 'primereact/menu';
import DashboardMenu from '@/components/menu/DashboardMenu';



interface NavBarProps {
    toggle: boolean
    handleHide: () => void
}

const NavBar: FC<NavBarProps> = ({toggle, handleHide}) => {

    const refMenu = useRef(null);
    const [visibleLeft, setVisibleLeft] = useState(toggle);

    useEffect(() => setVisibleLeft(toggle),[toggle])

    return (
        <Sidebar modal={false} className="p-sidebar-sm" visible={visibleLeft} onHide={handleHide} showCloseIcon={true}>
            <DashboardMenu/>
        </Sidebar>
    )
};

export default NavBar;