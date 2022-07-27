import Footer from '../footer'
import {ReactNode, useState} from "react"
import NavBarRight from "../nav/NavBarRight";
import Toolbar from "../nav/toolbar";
import style from "../../../styles/page.module.scss"

export interface LayoutProps {
    children: ReactNode;
}

const Layout = ({children}: LayoutProps) => {
    const [show, setShow] = useState(false)

    const handleClickMenu = () => {
        console.log('click')
        setShow(!show)
    }

    return (
        <>
            <Toolbar onClickMenu={handleClickMenu}/>
            <NavBarRight toggle={show} handleHide={() => {
                setShow(false)
            }}/>
            <main className={style.main}>{children}</main>
            <Footer/>
        </>
    )
}

export default Layout
