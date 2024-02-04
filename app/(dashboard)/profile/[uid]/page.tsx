import React, {FC} from 'react';
import {Button} from 'primereact/button';
import {ListBox} from 'primereact/listbox';

interface PageProps {
    params: {
        uid: string
    };
}

const Page: FC<PageProps> = ({params}) => {

    return (
        <div>
            <h1>Profile page {params.uid}</h1>

            <div className="card flex justify-content-center">
                <ListBox options={[
                    {name: 'New York', code: 'NY'},
                    {name: 'Rome', code: 'RM'},
                    {name: 'London', code: 'LDN'},
                    {name: 'Istanbul', code: 'IST'},
                    {name: 'Paris', code: 'PRS'}
                ]} optionLabel="name" className="w-full md:w-14rem"/>
            </div>

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
            <Button>Add</Button>
        </div>
    );
};

export default Page;