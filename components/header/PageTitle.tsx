import React, {FC} from 'react';

interface PageTitleProps {
    title: string
}

const PageTitle: FC<PageTitleProps> = ({title}) => {

    return (
        <header>
            <h1>{title}</h1>
        </header>
    );
}

export default PageTitle;
