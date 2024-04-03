import React, {FC} from 'react';
import {Button} from "primereact/button";
import './styles.scss'

interface GoToCartWidgetProps {

}

const GoToCartWidget: FC<GoToCartWidgetProps> = () => {
    return (
        <div className='wrap-widget'>
            <Button className='btn-confirm' label={'Оформить'} icon={'pi pi-gift'}/>
        </div>
    );
}

export default GoToCartWidget;