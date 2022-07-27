import {useEffect, useState} from "react";
import {Sidebar} from "primereact/sidebar";
import {Button} from "primereact/button";

interface INavBarRight {
    toggle: boolean
    // @ts-ignore
    handleHide: Function<void>
}

const NavBarRight = (props: INavBarRight) => {
    const {toggle, handleHide} = props
    const [visibleLeft, setVisibleLeft] = useState(toggle);

    useEffect(() => {
        console.log('NavBarRight')
        setVisibleLeft(toggle)
    }, [toggle])

    return (
        <Sidebar className="p-sidebar-sm " visible={visibleLeft} onHide={handleHide}>
            <h1 style={{fontWeight: 'normal'}}>Sidebar with custom icons</h1>
            <Button type="button" onClick={(e: any) => setVisibleLeft(false)} label="Save" className="p-button-success"
                    style={{marginRight: '.25em'}}/>

            <Button type="button" onClick={(e: any) => setVisibleLeft(false)} label="Cancel"
                    className="p-button-secondary"/>
        </Sidebar>
    )
}

export default NavBarRight
