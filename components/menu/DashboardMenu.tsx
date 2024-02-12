import React, {FC} from 'react';
import {Menu} from "primereact/menu";

interface DashboardMenuProps {

}

let items = [
    {label: 'Списки желаний', icon: 'pi pi-fw pi-plus'},
    {label: 'Уведомления', icon: 'pi pi-fw pi-plus'},
    {label: 'Интеграции', icon: 'pi pi-fw pi-plus'},
    {label: 'Настройки', icon: 'pi pi-fw pi-trash'}
];

const DashboardMenu: FC<DashboardMenuProps> = () => {
    return (
        <Menu model={items} className='w-auto'/>
    );
}

export default DashboardMenu;