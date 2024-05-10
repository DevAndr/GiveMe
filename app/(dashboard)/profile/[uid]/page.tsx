import React, {FC} from 'react';
import {Button} from 'primereact/button';
import './style.scss'

interface PageProps {
    params: {
        id: string
    };
}

const Page: FC<PageProps> = ({params}) => {

    return (
        <div className='page'>
            <h1 className='pageTitle'>{params.id}</h1>
            <small className='statusUser'>Статус пользователя</small>
            <div>
                React (иногда React.js или ReactJS) — JavaScript-библиотека[5] с открытым исходным кодом для разработки
                пользовательских интерфейсов.

                React разрабатывается и поддерживается Facebook, Instagram и сообществом отдельных разработчиков и
                корпораций[6][7][8].

                React может использоваться для разработки одностраничных и мобильных приложений.
                Его цель — предоставить высокую скорость разработки, простоту и масштабируемость.
                В качестве библиотеки для разработки пользовательских интерфейсов React часто используется с другими
                библиотеками,
                такими как MobX, Redux и GraphQL.
            </div>

            <div className="flex flex-column gap-4">
                <div style={{marginTop: '2rem'}} className="flex gap-4">
                    <Button label="Click" icon="pi pi-check"/>
                    <Button text label="Click" icon="pi pi-heart"/>
                    <Button text raised label="Click 1" icon="pi pi-heart"/>
                    <Button outlined label="Click 2" icon="pi pi-heart"/>

                    <Button type="button" label="Messages" icon="pi pi-users" outlined badge="2"
                            badgeClassName="p-badge-danger"/>
                </div>

                <div>
                    <span className="p-buttonset">
                        <Button label="Save" icon="pi pi-check"/>
                        <Button label="Delete" icon="pi pi-trash"/>
                        <Button label="Cancel" icon="pi pi-times"/>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Page;