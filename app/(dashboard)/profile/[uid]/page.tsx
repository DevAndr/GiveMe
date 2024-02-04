import React, {FC} from 'react';

interface PageProps {
    params: {
        uid: string
    }
}

const Page: FC<PageProps> = ({params}) => {
    return (
        <div>
            <h1>Profile page {params.uid}</h1>
            <div>
                React (иногда React.js или ReactJS) — JavaScript-библиотека[5] с открытым исходным кодом для разработки пользовательских интерфейсов.

                React разрабатывается и поддерживается Facebook, Instagram и сообществом отдельных разработчиков и корпораций[6][7][8].

                React может использоваться для разработки одностраничных и мобильных приложений.
                Его цель — предоставить высокую скорость разработки, простоту и масштабируемость.
                В качестве библиотеки для разработки пользовательских интерфейсов React часто используется с другими библиотеками,
                такими как MobX, Redux и GraphQL.
            </div>
        </div>
    )
}

export default Page;