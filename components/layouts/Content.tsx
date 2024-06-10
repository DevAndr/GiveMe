import React, {FC, HTMLAttributes, ReactNode} from 'react';
import './styles.scss'

type ContentTypeView = 'default' | 'center' | 'fullScreen' | 'fullScreenInTop'
interface ContentProps {
    children: ReactNode
    typeView?: ContentTypeView
}

const Content: FC<ContentProps & HTMLAttributes<HTMLDivElement>> =
    ({children, typeView = 'default', ...props}) => {

        return (
            <div className={`content ${typeView === 'default' ? ' ' : typeView} ${props.className || ''}`}>
                {children}
            </div>
        )
    }

export default Content;