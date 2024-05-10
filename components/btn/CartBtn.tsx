import React, {FC, useEffect, useState} from 'react';
import {Button} from "primereact/button";
import LocalCartService from '@/services/LocalCartService';

interface CartBtnProps {
    productId: string;
    keyList: string;
    isSelected?: boolean;
    onSelectedProduct: (id: string) => void;
}

type StateBtn = 'ADDED' | 'NONE' | 'LOADING' | 'STOCK'

const CartBtn: FC<CartBtnProps> = ({keyList, productId, isSelected, onSelectedProduct}) => {
    const [state, setState] = useState<StateBtn>(  isSelected ? 'ADDED' : 'NONE');

    // useEffect(() => {
    //     if (isSelected) {
    //         setState('ADDED');
    //     } else {
    //         setState('NONE');
    //     }
    // }, [isSelected]);



    const addInToCartHandler = async () => {
        if (state === 'NONE') {
            setState('LOADING');
            setTimeout(() => {
                onSelectedProduct(productId);
                setState('ADDED');
            }, 1500);
        }

        if (state === 'ADDED') {
            setState('LOADING');
            setTimeout(() => {
                onSelectedProduct(productId);
                setState('NONE');
            }, 300);
        }
    };

    return (
        <Button className="btn-add" icon={`pi ${state === 'NONE' ? 'pi-cart-plus' : 'pi-check'}`}
                loading={state === 'LOADING'} onClick={addInToCartHandler}/>
    );
};

export default CartBtn;