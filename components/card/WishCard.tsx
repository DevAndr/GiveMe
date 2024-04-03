'use client'

import React, {FC} from 'react';
import {Card} from "primereact/card";
import {ItemWIshList} from "@/components/types";
import './styles.scss'
import Image from "next/image";

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
        <Card title={HeaderCard()} className='card wish'>
            <div className='body'>
                <Image src={data.image} alt={data.name} width={200} height={200}/>
                <div>{data.description}</div>
            <div>{data.price}</div>
        </div>
</Card>
)
    ;
}

export default WishCard;