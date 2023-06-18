import Footer from '../footer'
import style from '../../styles/MainLayout.module.scss'
import React, {FC, ReactNode, useEffect, useState} from "react"
import NavBarRight from "../nav/NavBarRight";
import AppBar from "../nav/AppBar";
import AuthDialog from "../dialogs/AuthDialog";
import {useBreakpoint} from "../../hooks/breakpoint";
import Meta, { IMeta } from "../../seo/Meta";

export interface MainLayoutProps {
    children: ReactNode
    isHideMenu?: boolean
    className?: string
    isHideHeader?: boolean
    isHideFooter?: boolean
    isPresentView?: boolean
    meta: IMeta
}

const MainLayout: FC<MainLayoutProps> = ({
                                             children, className, isHideMenu, meta,
                                             isHideHeader, isHideFooter, isPresentView
                                         }) => {
    const breakpoints: any = useBreakpoint();
    const [show, setShow] = useState(false)

    const handleClickMenu = () => {
        console.log('click')
        setShow(!show)
    }

    return (
        <Meta {...meta}>
            {
                !isHideHeader && <>
                    <AppBar onClickMenu={handleClickMenu} isHideLeftMenu={isHideMenu} isPresentView={isPresentView}/>
                    <NavBarRight toggle={show} handleHide={() => {
                        setShow(false)
                    }}/>
                </>
            }
            <main style={show ? {marginLeft: '22rem'} : {}} className={style.mainLayout}>{children}</main>
            <AuthDialog/>
            {
                !isHideFooter && <Footer/>
            }
        </Meta>
    )
}

export default MainLayout
