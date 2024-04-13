'use client';

import React, {FC, useState} from 'react';
import {Toolbar} from "primereact/toolbar";
import Logo from "@/components/logo/Logo";
import {Avatar} from "primereact/avatar";
import NavBar from '@/components/navigation/NavBar';
import {Button} from 'primereact/button';
import './style.scss';
import {useAuth} from '@/providers/auth/AuthProvider';
import {useRouter} from 'next/navigation';
import {Menubar} from 'primereact/menubar';
import MenuAppBar from '@/components/appBar/MenuAppBar';
import { CiViewList } from 'react-icons/ci';
import {FaRegChartBar} from 'react-icons/fa6';
import {FaChartLine, FaRegListAlt} from 'react-icons/fa';

type AppBarType = 'dashboard' | 'default'

interface AppBarProps {
    type?: AppBarType;
    isAuthenticated?: boolean;
}

const AppBar: FC<AppBarProps> = ({type, isAuthenticated}) => {
    const router = useRouter();
    const {isAuth} = useAuth();
    const [show, setShow] = useState(false);
    // const isHideLeftMenu = false;

    const handleClickMenu = () => {
        setShow(!show);
    };

    const onClickMenu = () => {
        setShow(prevState => !prevState);
    };
    const hideMenuHandle = () => {
        setShow(false);
    };

    const authHandle = () => {
        router.push('/auth');
    };


    const LeftElements = <div className="leftElements">
        <Button className="menuBtn" aria-label="Меню" icon="pi pi-bars" onClick={onClickMenu}/>
        <Logo/>
    </div>;

    const RightElements = <div className="rightElements">
        <MenuAppBar items={[
            {
                label: 'Списки желаний',
                link: '/wish-lists',
                // icon: <FaRegListAlt />
            },
            {
                label: 'Статистика',
                link: '/statistics',
                // icon: <FaChartLine />
            },
        ]}/>
        {
            isAuth ? <Avatar className="profile" icon="pi pi-user" size="normal" shape="circle"/> :
                <Button className="btn-auth" size="small" label="Войти" icon="pi pi-sign-in" onClick={authHandle}/>
        }
    </div>;

    return (
        <>
            <Toolbar className="p-3 appBar" start={LeftElements} end={RightElements}/>
            <NavBar handleHide={hideMenuHandle} toggle={show}/>
        </>
    );
};

export default AppBar;