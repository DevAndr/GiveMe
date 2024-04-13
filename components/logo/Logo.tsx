import React, {FC} from 'react';
import Link from "next/link";
import './styles.scss'

interface LogoProps {

}

const Logo: FC<LogoProps> = () => {
    return (
        <Link href={'/'} className='logo'>
            <i className="pi pi-gift"/>
            <h6 className='m-0 p-0'>Give Me</h6>
        </Link>
    );
}

export default Logo;