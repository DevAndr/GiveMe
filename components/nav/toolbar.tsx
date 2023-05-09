import {Button} from 'primereact/button';
import {FC, MouseEventHandler, useState} from "react";
import style from "../../styles/Toolbar.module.scss"
import {useBreakpoint} from "../../hooks/breakpoint";
import {Toolbar as TB} from 'primereact/toolbar';
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {setVisibleAuthDialog} from '../../redux/reducers/auth.slice';
import {setHide} from "../../redux/reducers/toolbar.slice";
import {setHideBasket} from "../../redux/reducers/basketshop.slice";
import {Badge} from "primereact/badge";

interface INavBar {
    onClickMenu: MouseEventHandler
    isHideLeftMenu?: boolean
    isPresentView?: boolean
}

const Toolbar: FC<INavBar> = ({onClickMenu, isHideLeftMenu, isPresentView}) => {
    const breakpoint: any = useBreakpoint();
    const dispatch = useAppDispatch()
    const {backgroundColor} = useAppSelector(state => state.toolbar)
    const {hide} = useAppSelector(state => state.toolbar)
    const {showBasket, products} = useAppSelector(state => state.basketShop)
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

    const leftContents = () => {
        return isHideLeftMenu ? <></> :
            <>
                <Button aria-label='Меню' icon="pi pi-bars" onClick={onClickMenu}/>
            </>
    }

    const handleProfile = () => {

    }

    const handleAuth = () => {
        dispatch(setVisibleAuthDialog(true))
        dispatch(setHide(true))
    }

    const handleShowBasketHop = () => {
        dispatch(setHideBasket(!showBasket))
    }

    const rightContents = () => {
        const components = []

        if (isAuth) {
            components.push(<i key="badge-icon"
                className="pi pi-bell mr-4 p-text-secondary p-overlay-badge hover:bg-black-alpha-10 border-circle p-2 cursor-pointer"
                style={{fontSize: '1.4rem'}}>
                <Badge className="p-0 m-0 text-xs mt-2 mr-2" value="10+"></Badge></i>)

            if (["lg", "xl"].includes(breakpoint?.name)) {
                components.push(<Button key="profile-s" label='Личный кабинет' className="buttonDirect"
                                        aria-label='Личный кабинет'
                                        onClick={handleProfile} icon="pi pi-user"/>)
            } else {
                components.push(<Button key="profile-m" className="buttonDirect" aria-label='Личный кабинет'
                                        icon="pi pi-user" onClick={handleProfile}/>)
            }
        } else {
            components.push(<i key="cart-shop"
                className="pi pi-shopping-cart mr-4 p-text-secondary p-overlay-badge hover:bg-black-alpha-10 border-circle p-2 cursor-pointer"
                style={{fontSize: '1.4rem'}} onClick={handleShowBasketHop}>
                {
                    products.length ? <Badge className="p-0 m-0 text-xs mt-2 mr-2" value={products.length}/> : <></>
                }
            </i>)

            if (["lg", "xl"].includes(breakpoint?.name)) {
                components.push(<Button key="auth-s" label='Войти' className="buttonDirect"
                                        aria-label='Войти'
                                        onClick={handleAuth} icon="pi pi-user"/>)
            } else {
                components.push(<Button key="profile-m" className="buttonDirect" aria-label='Войти'
                                        icon="pi pi-user" onClick={handleAuth}/>)
            }

            if (isPresentView)
                components.pop()
        }


        return <div>{components}</div>
    }

    if (hide)
        return (<></>)

    return (
        <nav className={`${style.toolbar} sticky max-w-full top-0`}>
            <TB className="p-2" style={{backgroundColor, border: backgroundColor === '#fff' ? "" : 'none'}} start={leftContents} end={rightContents}/>
        </nav>
    )
}

export default Toolbar
