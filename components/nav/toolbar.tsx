import {Button} from 'primereact/button';
import {FC, MouseEventHandler, useState} from "react";
import styles from "../../styles/Toolbar.module.scss"
import {useBreakpoint} from "../../hooks/breakpoint";
import {Toolbar as TB} from 'primereact/toolbar';
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import { setVisibleAuthDialog } from '../../redux/reducers/auth.slice';
import {setHide} from "../../redux/reducers/toolbar.slice";

interface INavBar {
    onClickMenu: MouseEventHandler
}

const Toolbar: FC<INavBar> = ({onClickMenu}) => {
    const breakpoint: any = useBreakpoint();
    const dispatch = useAppDispatch()
    const {hide} = useAppSelector(state => state.toolbar)
    const {isAuth} = useAppSelector(state => state.auth)



    const items = [
        {
            label: 'Update',
            icon: 'pi pi-refresh'
        },
        {
            label: 'Delete',
            icon: 'pi pi-times'
        },
        {
            label: 'React Website',
            icon: 'pi pi-external-link',
            command: () => {
                window.location.href = 'https://reactjs.org/'
            }
        },
        {
            label: 'Upload',
            icon: 'pi pi-upload',
            command: () => {
                window.location.hash = "/fileupload"
            }
        }
    ];

    const leftContents = (
        <>
            <Button aria-label='Меню' icon="pi pi-bars" onClick={onClickMenu}/>
        </>
    );

    const handleProfile = () => {

    }

    const handleAuth = () => {
        dispatch(setVisibleAuthDialog(true))
        dispatch(setHide(true))
    }

    const rightContents = () => {
        const components = []

        if (isAuth) {
            if (["lg", "xl"].includes(breakpoint?.name)) {
                components.push(<Button key="profile-s" label='Личный кабинет' className={`${styles.buttonDirect}`}
                                        aria-label='Личный кабинет'
                                        onClick={handleProfile} icon="pi pi-user"/>)
            } else {
                components.push(<Button key="profile-m" className={`${styles.buttonDirect}`} aria-label='Личный кабинет'
                                        icon="pi pi-user" onClick={handleProfile}/>)
            }
        } else {
            if (["lg", "xl"].includes(breakpoint?.name)) {
                components.push(<Button key="auth-s" label='Войти' className={`${styles.buttonDirect}`}
                                        aria-label='Войти'
                                        onClick={handleAuth} icon="pi pi-user"/>)
            } else {
                components.push(<Button key="profile-m" className={`${styles.buttonDirect}`} aria-label='Войти'
                                        icon="pi pi-user" onClick={handleAuth}/>)
            }
        }

        return components
    }


    if (hide)
        return (<></>)

    return (
        <nav className={`sticky max-w-full top-0 ${styles.toolbar}`}>
            <TB className="bg-white p-2 border-none border-bottom-2" left={leftContents} right={rightContents}/>
        </nav>
    )
}

export default Toolbar
