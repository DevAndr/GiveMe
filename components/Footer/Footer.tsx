import React, {FC} from 'react';
import Link from "next/link";

interface FooterProps {

}

const Footer: FC<FooterProps> = () => {
    return (
        <footer>
            <Link href={'/'}>Пользовательское соглашение</Link>
        </footer>
    );
}

export default Footer;