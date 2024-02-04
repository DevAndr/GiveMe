import React, {FC} from 'react';
import Image from "next/image";
import Link from "next/link";

interface LogoProps {

}

const Logo: FC<LogoProps> = () => {
    return (
        <Link href={'/'} className='flex gap-2 align-items-center'>
            <i className="pi pi-gift"></i>
            <h6>Give Me</h6>
        </Link>
    );
}

export default Logo;