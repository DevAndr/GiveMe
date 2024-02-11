'use client';

import React, {FC, useState} from 'react';
import {Toolbar} from "primereact/toolbar";
import Logo from "@/components/logo/Logo";
import {Avatar} from "primereact/avatar";
import NavBar from '@/components/navigation/NavBar';
import {Button} from 'primereact/button';

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

    const leftContents = () => (<>
        {
            show ? <Button aria-label="Меню" icon="pi pi-times" onClick={onClickMenu}/> :
                <Button aria-label="Меню" icon="pi pi-bars" onClick={onClickMenu}/>
        }
        <Logo/>
    </>);

    return (
        <>
            <Toolbar className="p-3" start={leftContents()} end={<>
                <Avatar icon="pi pi-user" size="normal" shape="circle"/>
            </>}>

            </Toolbar>
            <NavBar handleHide={() => {
                setShow(false);
            }} toggle={show}/>
        </>
    );
};

export default AppBar;