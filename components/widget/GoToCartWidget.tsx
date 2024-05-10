import React, {FC} from 'react';
import {Button} from "primereact/button";
import './styles.scss';
import {Badge} from 'primereact/badge';
import {useMutation} from '@apollo/client';
import {PATH_ORDER} from '@/graphql';

interface GoToCartWidgetProps {
    count: number;
    onClick: () => void;
}

const GoToCartWidget: FC<GoToCartWidgetProps> = ({count, onClick}) => {


    return (
        <div className="wrap-widget">
            <div className="fixed">
                {
                    count > 0 &&
                    <Badge value={count} severity="danger" className="badge"/>
                }
                <Button className="btn-confirm" label={'Оформить'} icon={'pi pi-gift'} onClick={onClick}/>
            </div>
        </div>
    );
};

export default GoToCartWidget;