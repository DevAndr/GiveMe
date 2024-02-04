import React, {FC} from 'react';
import {Menu} from "primereact/menu";

interface ProfileMenuProps {

}


let items = [
    {label: 'New', icon: 'pi pi-fw pi-plus'},
    {label: 'Delete', icon: 'pi pi-fw pi-trash'}
];

const ProfileMenu: FC<ProfileMenuProps> = () => {
    return (
        <Menu model={items}/>
    );
}

export default ProfileMenu;