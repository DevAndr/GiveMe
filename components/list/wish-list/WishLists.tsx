'use client'

import React, {FC} from 'react';
import {DataScroller} from "primereact/datascroller";
import {ConfirmDialog} from "primereact/confirmdialog";
import {Button} from "primereact/button";

interface WishListsProps {

}

type WishList = {
    id: number
    title: string
}

const WishLists: FC<WishListsProps> = () => {
    const lists = [{id: 1, title: 'list 1'}, {id: 2, title: 'list 2'}]

    const ItemRow = (item: WishList) => {
        console.log(item)
        return (<div>{item.title}</div>)
    }

    return (
        <>
            <Button onClick={() => {
                
            }}>Добавить</Button>
            <DataScroller value={lists} itemTemplate={ItemRow} rows={5}/>
            <ConfirmDialog />
        </>
    );
}

export default WishLists;