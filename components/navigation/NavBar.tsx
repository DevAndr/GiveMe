import React, {FC, useEffect, useRef, useState} from 'react';
import {Sidebar} from 'primereact/sidebar';
import {Menu} from 'primereact/menu';

interface IMenuItem {
    label?: string
    icon?: string
    separator?: true
}

interface IMenu {
    label?: string
    items?: IMenuItem[]
    separator?: true
}

const menuItems: IMenu[] = [
    {
        label: "Списки желаний",
        items: [
            {
                label: "Сладости",
                icon: "pi pi-book"
            },
            {
                label: "Шмотки",
                icon: "pi pi-book"
            },
            {
                label: "Для игр",
                icon: "pi pi-book"
            }
        ]
    },
    {
        separator: true
    },
    {
        label: "Настройки",
        items: [
            {
                label: "Профиль",
                icon: "pi pi-user-edit"
            },
            {
                label: "Уведомления",
                icon: "pi pi-bell"
            },
            {
                label: "Безопасность",
                icon: "pi pi-shield"
            }
        ]
    }
]
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
            <h5>Панель управления</h5>

            <div className="card">
                <Menu className="w-full" model={menuItems}/>
            </div>
        </Sidebar>
    )
};

export default NavBar;