import React, {FC} from 'react';

interface PageTitleProps {
    title: string
}

const PageTitle: FC<PageTitleProps> = ({title}) => {
    return (
        <h1>
            {title}
        </h1>
    );
}

export default PageTitle;