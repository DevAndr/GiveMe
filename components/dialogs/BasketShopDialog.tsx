import React, {FC, useEffect, useState} from "react";
import {Dialog} from "primereact/dialog";
import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";
import {InputTextarea} from "primereact/inputtextarea";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {DataScroller} from "primereact/datascroller";
import {ProductService} from "../../services/product.service";
import {BiRuble} from "react-icons/bi";
import {IGiver, removeProductInBasket, setGiver} from "../../redux/reducers/basketshop.slice";

interface IBasketShopDialog {
    visible: boolean
    onHide: Function
    onShow: Function
    onSave: Function
}

const BasketShopDialog: FC<IBasketShopDialog> = ({visible, onHide, onShow, onSave}) => {
    const dispatch = useAppDispatch()
    const userName = "Vas1l1ne"
    const [giverData, setGiverData] = useState<IGiver>()
    const [linkToProduct, setLinkToProduct] = useState<string>("")
    const {giver, products} = useAppSelector(state => state.basketShop)
    const productService = new ProductService();

    useEffect(() => {
        // productService.getProducts().then(data => setProducts(data));
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const renderListItem = (data) => {
        return (
            <div className="col-12 align-self-center align-content-center align-items-center"
                 style={{display: "flow-root"}}>
                <div className="flex justify-content-center">
                    <img src={`images/product/${data.image}`}
                         onError={(e) =>
                             e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'}
                         alt={data.name}/>
                    <div className="flex-column flex ml-2" style={{minWidth: 320}}>
                        <div className="font-medium text-lg mb-1">{data.name}</div>
                        <div className="">{data.description}</div>
                        <div className="flex align-items-center mt-1">
                            <i className="pi pi-tag product-category-icon"/>
                            <span className="">{data.category}</span>
                        </div>
                    </div>
                    <div className="flex flex-column justify-content-between">
                        <i className="pi border-circle border-1 pi-times text-primary hover:text-pink-600 cursor-pointer align-self-end p-1 mt-2"
                           onClick={() => {
                               dispatch(removeProductInBasket(data))
                           }}/>
                        <span className="font-medium text-2xl">{data.price}<BiRuble/></span>
                    </div>
                </div>
            </div>
        );
    }

    const handleSave = () => {
        dispatch(setGiver(giverData))
        onSave();
    }

    const handleCancel = () => {
        dispatch(setGiver(giverData))
        onHide()
    }

    const footerContainer = () => {
        return <div className="flex justify-content-between mt-2">
            <div className="text-2xl font-medium">
                К оплате:<span
                className="font-medium text-2xl ml-4">{products.reduce((sum, currentProduct) => sum + currentProduct.price, 0)}<BiRuble/></span>
            </div>
            <Button label="Оплатить" icon="pi pi-check" className="p-button p-button-sm" onClick={handleSave}/>
        </div>
    }

    const hideDialog = () => {
        dispatch(setGiver(giverData))
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
                className="p-fluid" modal style={{width: '50vw', height: '70vh', zIndex: 9999}}
                footer={footerContainer} maximizable maskStyle={{zIndex: 1112}}
                onHide={hideDialog}>
            <div className="field">
                <div className="card">
                    <DataScroller value={products} itemTemplate={renderListItem} rows={5} inline scrollHeight="380px"
                                  emptyMessage={<div className="flex justify-content-center p-4">
                                      Нет подарков
                                  </div>}/>
                </div>
            </div>
            <div className="field">
                <div className="font-medium text-lg mb-2">Добавить свой подарок?</div>
                <label htmlFor="name">Внимание! Ссылка на Ozon или Wildberries*</label>
                <div id="input-url" className="mt-0 w-full">
                    <div className="p-inputgroup">
                                        <span className="p-inputgroup-addon">
                                            <i className="pi pi-link"/>
                                        </span>
                        <InputText id="link-to-product" placeholder="Ссылка на товар" value={linkToProduct}
                                   onChange={(e) => {
                            setLinkToProduct(e.target.value)
                        }}/>
                        <Button icon="pi pi-clone" onClick={() => {
                            //link-to-product
                            const copyTextarea = document.getElementById("link-to-product")
                            copyTextarea?.select()
                            document.execCommand("copy")

                            // const data = document.execCommand('paste')
                            // setLinkToProduct(data)
                        }}/>
                    </div>
                </div>

            </div>
            <div className="field">
                <label htmlFor="name">Ваше имя</label>
                <InputText id="name" required autoFocus value={giver?.name} onChange={(e) => {
                    setGiverData({...giver, name: e.target.value})
                }}/>

            </div>
            <div className="field">
                <label htmlFor="description">Пожелание</label>
                <InputTextarea id="description" autoResize required rows={3} cols={20}
                               value={giver?.description} onChange={(e) => {
                    setGiverData({...giver, description: e.target.value})
                }}/>
            </div>
        </Dialog>
    )
}

export default BasketShopDialog
