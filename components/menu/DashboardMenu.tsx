import React, {FC} from 'react';
import {Menu} from "primereact/menu";
import {FaList} from 'react-icons/fa6';
import {IoNotificationsOutline, IoSettingsOutline} from 'react-icons/io5';
import {FaLink} from 'react-icons/fa';
import Link from 'next/link';
import './styles.scss';
import {IoIosLink, IoIosList} from 'react-icons/io';

interface DashboardMenuProps {

}

type MenuItem = {
    label: string;
    icon: React.ReactNode;
    url: string;
}

let items: MenuItem[] = [
    {label: 'Списки желаний', icon: <IoIosList/>, url: '/wishlists'},
    {label: 'Уведомления', icon: <IoNotificationsOutline/>, url: '/notifications'},
    {label: 'Интеграции', icon: <IoIosLink/>, url: '/integrations'},
    {label: 'Настройки', icon: <IoSettingsOutline/>, url: '/settings'}
];

const DashboardMenu: FC<DashboardMenuProps> = () => {
    return (
        <ul className="menu-dashboard">
            {items.map((item, index) => (
                <li key={index} className="item">
                    {item.icon}<Link href={item.url}>{item.label}</Link>
                </li>
            ))}
        </ul>
    );
};

export default DashboardMenu;