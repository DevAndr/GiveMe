import styles from '../../../styles/Home.module.css'
import Footer from '../footer'
import {ReactNode, useState} from "react"
import NavBarRight from "../nav/NavBarRight";
import Toolbar from "../nav/toolbar";

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
            <main className={styles.main}>{children}</main>
            <Footer/>
        </>
    )
}

export default Layout
