import {useEffect, useRef, useState} from "react";
import {Sidebar} from "primereact/sidebar";
import {Button} from "primereact/button";
import {Menu} from "primereact/menu";

interface INavBarRight {
    toggle: boolean
    // @ts-ignore
    handleHide: Function<void>
}

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
                label: "Для секс игр",
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

const NavBarRight = (props: INavBarRight) => {
    const {toggle, handleHide} = props
    const refMenu = useRef(null);
    const [visibleLeft, setVisibleLeft] = useState(toggle);

    useEffect(() => {
        console.log('NavBarRight')
        setVisibleLeft(toggle)
    }, [toggle])

    return (
        <Sidebar modal={false} className="p-sidebar-sm" visible={visibleLeft} onHide={handleHide} showCloseIcon={false}>
            <h1 style={{fontWeight: 'normal'}}>Sidebar with custom icons</h1>

            <div className="card">
                <Menu className="w-full" model={menuItems}/>
            </div>
        </Sidebar>
    )
}

export default NavBarRight
