import ButtonSocial from '../buttons/ButtonSocial';
import {FC} from "react";

const Footer: FC = () => {

    return (
        <footer className="w-full flex flex-column justify-content-center mt-6">
            <div className="flex w-full justify-content-center">
                <div className="ml-2 mr-2">Пользовательское соглашение</div>
                <div className="ml-2 mr-2">Политика конфиденциальности</div>
                <div className="ml-2 mr-2">Поддержка</div>
            </div>
            <div className="relative left-1 bottom-1 ml-1">
                © 2021-2022
            </div>
            <ButtonSocial/>
        </footer>
    )
}

export default Footer
