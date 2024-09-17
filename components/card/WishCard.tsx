'use client';

import React, {FC} from 'react';
import {Card} from "primereact/card";
import {ItemWIshList} from "@/components/types";
import './styles.scss';
import Image from "next/image";
import Likes from "@/components/likes/Likes";
import CartBtn from "@/components/btn/CartBtn";
import {IoGiftSharp} from 'react-icons/io5';
import {Product} from '@/graphql/types';
import {Button} from 'primereact/button';

interface WishCardProps {
    keyList: string;
    selectedProducts: string[];
    // setSelectedProducts: (value: string) => void;
    data: Product;
}

const WishCard: FC<WishCardProps> = ({data, keyList, selectedProducts}) => {
    const isGifted = !!data.idSender;
    const giver = 'Hella';

    const HeaderCard = () => {
        return (<div>
            {data.name}
        </div>);
    };


    return (
        <Card className="card wish">
            <div className="header">
                <div className="wrap-header">
                    <Image className="img" src={data.img} alt={data.name} width={200} height={200}
                           onError={(e: any) => e.target.src = '/images/placeholder.png'}/>
                    {
                        isGifted && <div className="gift-label">
                            <IoGiftSharp className="icon"/>
                        </div>
                    }
                </div>
            </div>
            <div className="body">
                <h6 className="title">{data.name}</h6>
                <div className="description">{data.description}</div>
                {
                    !isGifted ? <div className="flex justify-between items-center">
                            <div className="price">{data.price} ₽</div>
                            <CartBtn keyList={keyList} isSelected={!!selectedProducts.find(e => e === data.id)}
                                     productId={data.id} onSelectedProduct={(v) => {}}/>
                        </div> :
                        <div className="gift">
                            {
                                giver ? <>Подарил <b>{giver}</b></> : <>Подарено</>
                            }
                        </div>
                }
            </div>
        </Card>
    )
        ;
};

export default WishCard;