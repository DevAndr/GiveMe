'use client';

import React, {FC, useState} from 'react';
import {Toolbar} from "primereact/toolbar";
import Logo from "@/components/logo/Logo";
import {Avatar} from "primereact/avatar";
import NavBar from '@/components/navigation/NavBar';
import {Button} from 'primereact/button';
import './style.scss'

type AppBarType = 'dashboard' | 'default'

interface AppBarProps {
    type?: AppBarType;
    isAuthenticated?: boolean;
}

const AppBar: FC<AppBarProps> = ({type, isAuthenticated}) => {
    const [show, setShow] = useState(false);
    // const isHideLeftMenu = false;

    const handleClickMenu = () => {
        setShow(!show);
    };

    const onClickMenu = () => {
        setShow(prevState => !prevState);
    };

    const LeftElements = <div className='leftElements'>
        <Button className='menuBtn' aria-label="Меню" icon="pi pi-bars" onClick={onClickMenu}/>
        <Logo/>
    </div>

    const RightElements = <>
        <Avatar icon="pi pi-user" size="normal" shape="circle"/>
    </>

    return (
        <>
            <Toolbar className="p-3 appBar" start={LeftElements} end={RightElements}/>
            <NavBar handleHide={() => {
                setShow(false);
            }} toggle={show}/>
        </>
    );
};

export default AppBar;