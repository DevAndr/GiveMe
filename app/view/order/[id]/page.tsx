'use client';

import React, {FC} from 'react';
import {Button} from 'primereact/button';
import {InputText} from 'primereact/inputtext';
import {InputTextarea} from 'primereact/inputtextarea';
import './styles.scss';
import useSender from '@/hooks/useSender';

interface PageOrderProps {

}

const PageOrder: FC<PageOrderProps> = ({}) => {
    const {senderId} = useSender()

    console.log({senderId});

    return (
        <div className="w-full page">
            <h1>Оформить заказ</h1>

            <div className="flex flex-col content-center align-items-center">
                <div className="form-giver">
                    <div className="group">
                        <label htmlFor="username">От кого</label>
                        <InputText id="username" className="input" aria-describedby="username-help"/>
                        <small id="username-help">
                            Имя от кого будет подарок
                        </small>
                    </div>
                    <div className="group">
                        <label htmlFor="description">Пожелания</label>
                        <InputTextarea id="description" autoResize className="textarea"
                                       rows={5} cols={30}/>
                    </div>
                </div>
            </div>
            <h3>Способы оплаты</h3>
            <div className="controls">
                <Button label="Отменить" text/>
                <Button label="Заказать"/>
            </div>
        </div>
    );
};

export default PageOrder;