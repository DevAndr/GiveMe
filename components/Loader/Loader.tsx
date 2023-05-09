import React, {FC} from 'react';
import {ProgressSpinner, ProgressSpinnerProps} from "primereact/progressspinner";
import style from './Loader.module.scss'

interface LoaderProps {

}

const Loader: FC<LoaderProps & ProgressSpinnerProps> = (props) => {
    return (
        <ProgressSpinner {...props} className={style.loader}/>
    )
}

export default Loader;