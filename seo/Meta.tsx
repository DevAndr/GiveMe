import React, {FC, PropsWithChildren} from 'react';
import Head from "next/head";

export interface IMeta {
    title: string
    description?: string
}
interface MetaProps extends IMeta {}

const Meta: FC<PropsWithChildren<MetaProps>> = ({title, description, children}) => {
    return (
        <>
            <Head>
                {title}
                {description ? <>
                        <meta name="description" content={description}/>
                        <meta name="og:title" content={title}/>
                        <meta name="og:description" content={description}/>
                    </> :
                    <meta name="robots" content="noindex, nofolow"/>}
            </Head>
            {children}
        </>
    )
}

export default Meta;