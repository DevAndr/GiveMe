import Footer from '../footer'
import React, {FC, ReactNode, useEffect, useState} from "react"
import NavBarRight from "../nav/NavBarRight";
import Toolbar from "../nav/toolbar";
import style from "../../styles/page.module.scss"
import clsx from 'clsx';
import AuthDialog from "../dialogs/AuthDialog";

export interface MainLayoutProps {
    children: ReactNode
    isHideMenu?: boolean
    className?: string
    isHideHeader?: boolean
}

const MainLayout: FC<MainLayoutProps> = ({children, className, isHideMenu, isHideHeader}) => {
    const [show, setShow] = useState(false)

    useEffect(() => {

    })

    const handleClickMenu = () => {
        console.log('click')
        setShow(!show)
    }

    return (
        <div className={clsx('wrapper', className)}>
            <Toolbar onClickMenu={handleClickMenu}/>
            <NavBarRight toggle={show} handleHide={() => {
                setShow(false)
            }}/>
            <main className={`${style.main}`} style={show ? {marginLeft: '22rem'} : {}}>{children}</main>
            <AuthDialog/>
            <Footer/>
        </div>
    )
}

export default MainLayout
