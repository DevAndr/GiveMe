import {NextPage} from "next";
import MainLayout from "../components/layouts/MainLayout";
import {DataView, DataViewLayoutOptions} from 'primereact/dataview';
import React, {useEffect, useState} from "react";
import {Button} from "primereact/button";
import {ProductService} from "../services/product.service";
import {Dropdown} from "primereact/dropdown";
import style from '../styles/Lists.module.scss'
import SectionLikes from "../components/section-likes";
import {IoIosGift} from 'react-icons/io';
import {BiRuble} from "react-icons/bi";
import BasketShopDialog from "../components/dialogs/BasketShopDialog";
import {useAppDispatch, useAppSelector} from "../redux/hooks";
import {addProductToBasket, setHideBasket} from "../redux/reducers/basketshop.slice";

import {useRouter} from 'next/router'
import WishList from "../components/wish-list/WishList";


const Lists: NextPage = () => {
    const dispatch = useAppDispatch()
    const router = useRouter()
    const {showBasket, products: basketProducts} = useAppSelector(state => state.basketShop)

    return <>
        <MainLayout>
            <WishList isOwner={true}/>
            <BasketShopDialog visible={showBasket} onHide={() => {
                dispatch(setHideBasket(!showBasket))
            }} onSave={() => {
                router.push('/payment')
            }} onShow={() => {
                dispatch(setHideBasket(!showBasket))
            }}/>
        </MainLayout>
    </>
}

export default Lists
