import React, {FC} from 'react';
import {Toolbar} from "primereact/toolbar";
import Logo from "@/components/logo/Logo";
import {Avatar} from "primereact/avatar";

type AppBarType = 'dashboard' | 'default'

interface AppBarProps {
    type?: AppBarType
    isAuthenticated?: boolean
}

const AppBar: FC<AppBarProps> = ({type, isAuthenticated}) => {


    return (
        <Toolbar className='p-4' start={<>
            <Logo/>
        </>} end={<>
            <Avatar size={'normal'} icon={'pi pi-user'} className='cursor-pointer'/>
        </>}>

        </Toolbar>
    );
}

export default AppBar;