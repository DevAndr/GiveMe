import React, {FC} from 'react';
import Link from "next/link";

interface LogoProps {

}

const Logo: FC<LogoProps> = () => {
    return (
        <Link href={'/'} className='flex gap-2 align-items-center ml-4'>
            <i className="pi pi-gift"/>
            <h6 className='m-0'>Give Me</h6>
        </Link>
    );
}

export default Logo;