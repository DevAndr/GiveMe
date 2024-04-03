'use client'

import React, {FC} from 'react';
import {Card} from "primereact/card";
import {ItemWIshList} from "@/components/types";
import './styles.scss'
import Image from "next/image";
import Likes from "@/components/likes/Likes";
import CartBtn from "@/components/btn/CartBtn";

interface WishCardProps {
    data: ItemWIshList
}

const WishCard: FC<WishCardProps> = ({data}) => {
    const HeaderCard = () => {

        return (<div>
            {data.name}
        </div>)
    }

    return (
        <Card className='card wish'>
            <div className='header'>
                <div className="wrap-header">
                    <Image className='img' src={data.image} alt={data.name} width={200} height={200}/>
                    <CartBtn/>
                </div>
            </div>
            <div className='body'>
                <h6 className='title'>{data.name}</h6>
                <div className='description'>{data.description}</div>
                <div className='price'>{data.price} ₽</div>
            </div>
            {/*<div className="footer">*/}
            {/*    <Likes/>*/}
            {/*</div>*/}
        </Card>
    )
        ;
}

export default WishCard;