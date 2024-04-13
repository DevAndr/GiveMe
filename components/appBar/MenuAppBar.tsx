import React, {FC} from 'react';
import NavBarLink from '@/components/appBar/NavBarLink';
import './style.scss';

interface MenuAppBarProps {
    items: NavBarLink[];
}

const MenuAppBar: FC<MenuAppBarProps> = ({items}) => {
    return (
        <div className="menu-nav-bar">
            {
                items.map((item, index) => (
                    <NavBarLink key={index} label={item.label} link={item.link} icon={item.icon}/>
                ))
            }
        </div>
    );
};

export default MenuAppBar;