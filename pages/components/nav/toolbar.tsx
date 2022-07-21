import {Button} from 'primereact/button';
import {MouseEventHandler} from "react";
import styles from "../../../styles/Toolbar.module.scss"

interface INavBar {
    onClickMenu: MouseEventHandler
}

const Toolbar = (props: INavBar) => {
    const {onClickMenu} = props

    return (
        <nav className={`sticky max-w-full top-0 ${styles.toolbar}`}>
            <div className="flex flex-wrap p-2 align-items-center justify-content-between">
                <Button aria-label='Меню' icon="pi pi-bars" onClick={onClickMenu}/>
                <Button label='Личный кабинет' className={`${styles.buttonDirect}`} aria-label='Личный кабинет' icon="pi pi-user"/>
            </div>
        </nav>
    )
}

export default Toolbar
