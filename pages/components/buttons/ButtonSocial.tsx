import { Button } from 'primereact/button';
import { FC } from 'react';
import './ButtonSocial.module.css'

const ButtonSocial = () => {

    return (
        <div className="template">
        <Button className="google p-0" aria-label="Google">
            <i className="pi pi-google px-2"></i>
            <span className="px-3">Google</span>
        </Button>
        <Button className="youtube p-0" aria-label="Youtube">
            <i className="pi pi-youtube px-2"></i>
            <span className="px-3">Youtube</span>
        </Button>
        <Button className="telegram p-0" aria-label="Telegram">
            <i className="pi pi-telegram px-2"></i>
            <span className="px-3">Telegram</span>
        </Button>
        <Button className="discord p-0" aria-label="Discord">
            <i className="pi pi-discord px-2"></i>
            <span className="px-3">Discord</span>
        </Button>
    </div>
    )
}

export default ButtonSocial
