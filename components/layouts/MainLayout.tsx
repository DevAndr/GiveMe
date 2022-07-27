import Footer from '../footer'
import {FC, ReactNode, useState} from "react"
import NavBarRight from "../nav/NavBarRight";
import Toolbar from "../nav/toolbar";
import style from "../../styles/page.module.scss"
import clsx from 'clsx';

export interface MainLayoutProps {
    children: ReactNode
    isHideMenu?: boolean
    className?: string
    isHideHeader?: boolean
}

const MainLayout: FC<MainLayoutProps> = ({children, className, isHideMenu, isHideHeader}) => {
    const [show, setShow] = useState(false)

    const handleClickMenu = () => {
        console.log('click')
        setShow(!show)
    }

    return (
        <div className={clsx('wrapper', className)}>
            <Toolbar hide={isHideHeader} onClickMenu={handleClickMenu}/>
            <NavBarRight toggle={show} handleHide={() => {
                setShow(false)
            }}/>
            <main className={style.main}>{children}</main>
            <Footer/>
        </div>
    )
}

export default MainLayout
