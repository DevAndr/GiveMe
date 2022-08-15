import React, {FC, useEffect, useState} from "react";
import {Dialog} from "primereact/dialog";
import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";
import {InputTextarea} from "primereact/inputtextarea";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {DataScroller} from "primereact/datascroller";
import {ProductService} from "../../services/product.service";
import {BiRuble} from "react-icons/bi";
import {IoIosGift} from "react-icons/io";

// import style from "../../styles"

interface IBasketShopDialog {
    visible: boolean
    onHide: Function
    onShow: Function
}

const BasketShopDialog: FC<IBasketShopDialog> = ({visible, onHide, onShow}) => {
    const dispatch = useAppDispatch()
    const userName = "Vas1l1ne"
    const [products, setProducts] = useState([]);
    const productService = new ProductService();

    useEffect(() => {
        productService.getProducts().then(data => setProducts(data));
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const renderListItem = (data) => {
        return (
            <div className="col-12 align-self-center align-content-center align-items-center">
                <div className="flex">
                    <img src={`images/product/${data.image}`}
                         onError={(e) =>
                             e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'}
                         alt={data.name}/>
                    <div className="flex-column flex  ml-2">
                        <div className="font-medium text-lg mb-1">{data.name}</div>
                        <div className="">{data.description}</div>
                        <div className="flex align-items-center mt-1">
                            <i className="pi pi-tag product-category-icon"/>
                            <span className="">{data.category}</span>
                        </div>
                    </div>
                    <div className="flex justify-content-between flex-row-reverse align-items-end">
                        <span className="font-medium text-2xl">{data.price}<BiRuble/></span>
                    </div>
                </div>
            </div>
        );
    }

    const handleSave = () => {
        onHide()
    }

    const handleCancel = () => {
        onHide()
    }

    const footerContainer = () => {
        return <>
            <Button label="Отмена" icon="pi pi-times" className="p-button-outlined p-button-sm" onClick={handleCancel}/>
            <Button label="Добавить" icon="pi pi-check" className="p-button p-button-sm" onClick={handleSave}/>
        </>
    }

    const hideDialog = () => {
        onHide()
    }

    const headerDialog = () => {

        return <div>
            Корзина подарков для
            <span className="text-2xl ml-2 text-primary-500">{userName}</span>
        </div>
    }

    return (
        <Dialog visible={visible} header={headerDialog}
                className="p-fluid" modal style={{width: '50vw', height: '70vh', zIndex: 1103}}
                footer={footerContainer} maximizable maskStyle={{zIndex: 1111}}
                onHide={hideDialog}>
            <div className="field">
                <div className="card">
                    <DataScroller value={products} itemTemplate={renderListItem} rows={5} inline scrollHeight="400px"/>
                </div>
            </div>
            <div className="field">
                <label htmlFor="name">Ваше имя</label>
                <InputText id="name" required autoFocus/>

            </div>
            <div className="field">
                <label htmlFor="description">Пожелание</label>
                <InputTextarea id="description" autoResize required rows={3} cols={20}/>
            </div>
        </Dialog>
    )
}

export default BasketShopDialog
