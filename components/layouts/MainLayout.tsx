import Footer from '../footer'
import style  from '../../styles/MainLayout.module.scss'
import React, {FC, ReactNode, useEffect, useState} from "react"
import NavBarRight from "../nav/NavBarRight";
import Toolbar from "../nav/toolbar";
import AuthDialog from "../dialogs/AuthDialog";
import {useBreakpoint} from "../../hooks/breakpoint";

export interface MainLayoutProps {
    children: ReactNode
    isHideMenu?: boolean
    className?: string
    isHideHeader?: boolean
    isHideFooter?: boolean
    isPresentView?: boolean
}

const MainLayout: FC<MainLayoutProps> = ({children, className, isHideMenu,
                                             isHideHeader, isHideFooter, isPresentView}) => {
    const breakpoints: any = useBreakpoint();
    const [show, setShow] = useState(false)

    const handleClickMenu = () => {
        console.log('click')
        setShow(!show)
    }

    console.log(breakpoints)

    return (
        <>
            {
                !isHideHeader && <>
                    <Toolbar onClickMenu={handleClickMenu} isHideLeftMenu={isHideMenu} isPresentView={isPresentView}/>
                    <NavBarRight toggle={show} handleHide={() => {setShow(false)}}/>
                </>
            }
            <main style={show ? {marginLeft: '22rem'} : {}} className={`${style.mainLayout} ${className ? className : ''}`}>{children}</main>
            <AuthDialog/>
            {
                !isHideFooter && <Footer/>
            }
        </>
    )
}

export default MainLayout
