import React, {FC, ReactNode} from 'react';
import './style.scss';
import Link from 'next/link';

interface NavBarLink {
    label: string;
    link: string;
    icon?: ReactNode;

}

const NavBarLink: FC<NavBarLink> = ({label, link, icon}) => {
    return (
        <div className="nav-link-bar">
            {icon}
            <Link href={link}>{label}</Link>
        </div>
    );
};

export default NavBarLink;