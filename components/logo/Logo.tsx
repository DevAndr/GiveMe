import React, {FC} from 'react';
import style from '../../styles/logo.module.scss'

interface LogoProps {

}

const Logo: FC<LogoProps> = () => {
    return (
        <div className={style.logo}>
            Give Me
        </div>
    );
}

export default Logo;