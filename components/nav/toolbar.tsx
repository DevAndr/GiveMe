import {Button} from 'primereact/button';
import {FC, MouseEventHandler} from "react";
import styles from "../../styles/Toolbar.module.scss"
import {useBreakpoint} from "../../hooks/breakpoint";
import { Toolbar as TB } from 'primereact/toolbar';

interface INavBar {
    onClickMenu: MouseEventHandler
    hide?: boolean
}

const Toolbar: FC<INavBar> = ({onClickMenu, hide}) => {
    const breakpoint: any = useBreakpoint();

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
        {   label: 'Upload',
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

    const rightContents = (
        <>
            {
                ["lg", "xl"].includes(breakpoint?.name) ?
                    <Button label='Личный кабинет' className={`${styles.buttonDirect}`} aria-label='Личный кабинет'
                            icon="pi pi-user"/> :
                    <Button className={`${styles.buttonDirect}`} aria-label='Личный кабинет' icon="pi pi-user"/>
            }
        </>
    );

    if (hide)
        return (<></>)

    return (
        <nav className={`sticky max-w-full top-0 ${styles.toolbar}`}>
            <TB className="bg-white p-2 border-none border-bottom-2" left={leftContents} right={rightContents} />
        </nav>

        // <nav className={`sticky max-w-full top-0 ${styles.toolbar}`}>
        //     <div className="flex flex-wrap p-2 align-items-center justify-content-between">
        //         <Button aria-label='Меню' icon="pi pi-bars" onClick={onClickMenu}/>
        //         {
        //             ["lg", "xl"].includes(breakpoint?.name) ?
        //                 <Button label='Личный кабинет' className={`${styles.buttonDirect}`} aria-label='Личный кабинет'
        //                         icon="pi pi-user"/> :
        //                 <Button className={`${styles.buttonDirect}`} aria-label='Личный кабинет' icon="pi pi-user"/>
        //         }
        //     </div>
        // </nav>
    )
}

export default Toolbar
