import React, {FC, useState} from 'react';
import {Button} from "primereact/button";

interface CartBtnProps {

}

type StateBtn = 'ADDED' | 'NONE' | 'LOADING' | 'STOCK'

const CartBtn: FC<CartBtnProps> = () => {
    const [state, setState] = useState<StateBtn>('NONE')

    const addInToCartHandler = async () => {
        if (state === 'NONE') {
            setState('LOADING')
            await setTimeout(() => setState('ADDED'), 1500)
        }

        if (state === 'ADDED') {
            setState('LOADING')
            await setTimeout(() => setState('NONE'), 300)
        }
    }

    return (
        <Button className='btn-add' icon={`pi ${state === 'NONE' ? 'pi-cart-plus' : 'pi-check'}`}
                loading={state === 'LOADING'} onClick={addInToCartHandler}/>
    );
}

export default CartBtn;