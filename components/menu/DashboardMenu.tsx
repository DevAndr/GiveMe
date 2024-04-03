import React, {FC} from 'react';
import {Menu} from "primereact/menu";
import {MenuItem} from "primereact/menuitem";

interface DashboardMenuProps {

}

let items:  MenuItem[] = [
    {label: 'Списки желаний', icon: 'pi pi-fw pi-plus', url: '/wishlists'},
    {label: 'Уведомления', icon: 'pi pi-fw pi-plus', url: '/notifications'},
    {label: 'Интеграции', icon: 'pi pi-fw pi-plus', url: '/integrations'},
    {label: 'Настройки', icon: 'pi pi-fw pi-trash', url: '/settings'},
];

const DashboardMenu: FC<DashboardMenuProps> = () => {
    return (
        <Menu model={items} className='w-auto' />
    );
}

export default DashboardMenu;