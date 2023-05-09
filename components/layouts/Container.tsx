import React, {FC, PropsWithChildren} from 'react';
import style from "./Container.module.scss"

const Container: FC<PropsWithChildren<unknown>> = ({children}) => {
    return (
        <div className={style.Container}>
            {children}
        </div>
    )
}

export default Container;