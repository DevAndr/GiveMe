

import React, {FC} from 'react';
import Image from "next/image";
import assetEmptyImg from '../../assets/images/empty.png';
import './styles.scss';
import {ItemWIshList} from "@/components/types";
import WishCard from "@/components/card/WishCard";
import {Product} from '@/graphql/types';
import LocalCartService from '@/services/LocalCartService';

const data: ItemWIshList[] = [
    {
        id: 0,
        name: 'Item 0',
        description: 'Description 0',
        price: 999,
        image: 'https://images.hepsiburada.net/assets/ProductDescription/201807/b54072f9-7314-449b-ac9c-739ea3ed9117.jpg'
    },
    {
        id: 1,
        name: 'Item 1',
        description: 'Description 1',
        price: 100,
        image: 'https://ae01.alicdn.com/kf/HTB1aqOiaffsK1RjSszgq6yXzpXaS.jpg'
    },
    {
        id: 2,
        name: 'Item 2',
        description: 'Description 2',
        price: 200,
        image: 'https://cgmood.com/storage/previews/02-2020/13997/13997-29073.jpeg'
    },
    {
        id: 3,
        name: 'Item 3',
        description: 'Description 3',
        price: 300,
        image: 'https://cdn.shopify.com/s/files/1/0026/7331/1788/products/cd_1200x1200.jpg'
    },
    {
        id: 4,
        name: 'Item 1',
        description: 'Description 1',
        price: 100,
        image: 'https://ae01.alicdn.com/kf/HTB1aqOiaffsK1RjSszgq6yXzpXaS.jpg'
    },
    {
        id: 5,
        name: 'Item 2',
        description: 'Description 2',
        price: 200,
        image: 'https://cgmood.com/storage/previews/02-2020/13997/13997-29073.jpeg'
    },
    {
        id: 6,
        name: 'Item 3',
        description: 'Description 3',
        price: 300,
        image: 'https://cdn.shopify.com/s/files/1/0026/7331/1788/products/cd_1200x1200.jpg'
    },
    {
        id: 7,
        name: 'Item 1',
        description: 'Description 1',
        price: 100,
        image: 'https://ae01.alicdn.com/kf/HTB1aqOiaffsK1RjSszgq6yXzpXaS.jpg'
    },
    {
        id: 8,
        name: 'Item 2',
        description: 'Description 2',
        price: 200,
        image: 'https://cgmood.com/storage/previews/02-2020/13997/13997-29073.jpeg'
    },
    {
        id: 9,
        name: 'Item 3',
        description: 'Description 3',
        price: 300,
        image: 'https://cdn.shopify.com/s/files/1/0026/7331/1788/products/cd_1200x1200.jpg'
    }
];

interface WishListViewProps {
    keyList: string;
    products: Product[];
    selectedProducts: string[];
    // setSelectedProducts: (value: string) => void;
}


const WishListPublic: FC<WishListViewProps> = ({products, keyList, selectedProducts,  }) => {

    const emptyMessage = (<div className='flex justify-center align-center'>
        <div className="empty-msg">
            <Image src={assetEmptyImg} alt={'Пустой список'} width={64} height={64}/>
            <p>Список пуст или не доступен по ссылке</p>
        </div>
    </div>);

    if (products.length === 0) {
        return emptyMessage;
    }

    return (
        <ul className="list wish">
            {
                products.map(wish => <li className="item"><WishCard keyList={keyList}
                                                                    selectedProducts={selectedProducts} data={wish}
                                                                     /></li>)
            }
        </ul>
    );
};

export default WishListPublic;