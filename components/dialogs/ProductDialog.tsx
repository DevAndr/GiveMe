import React, {ChangeEventHandler, FC, useEffect, useState} from "react";
import {Dialog} from "primereact/dialog";
import {Button} from "primereact/button";
import {InputTextarea} from "primereact/inputtextarea";
import {InputText} from "primereact/inputtext";
import {Chips, ChipsChangeParams} from "primereact/chips";
import {useMutation} from "@apollo/client";
import {IProduct, ParamsCreateProduct, RsponseProduct} from "../../services/graphql/types";
import {CREATE_PRODUCT_TO_LIST, GET_PRODUCTS_BY_UID_LIST} from "../../services/graphql";
import {MarketType} from "../marketPlace";

interface IProductDialog {
    visible: boolean
    currentUIDWishList?: string
    onHide: Function
    onShow: Function
}

const ProductDialog: FC<IProductDialog> = ({visible, onHide, currentUIDWishList}) => {
    const [createProduct] = useMutation<RsponseProduct, ParamsCreateProduct>(CREATE_PRODUCT_TO_LIST);
    const [submitted, setSubmitted] = useState(true)
    const [labels, setLabels] = useState<string[]>([])
    const [typeMarketPlace, setTypeMarketPlace] = useState<MarketType | undefined>()
    const [data, setData] = useState<IProduct>()
    const [linkProduct, setLinkProduct] = useState<string>()
    const [nameProduct, setNameProduct] = useState<string>()
    const [descriptionProduct, setDescriptionProduct] = useState<string>()


    const handleSave = async () => {
        if (linkProduct && nameProduct && typeMarketPlace && currentUIDWishList) {

            const {data: dataProduct} = await createProduct({
                variables: {
                    data: {
                        uidWishList: currentUIDWishList,
                        name: nameProduct,
                        link: linkProduct,
                        marketPlace: typeMarketPlace,
                        description: descriptionProduct,
                        labels: labels
                    }
                },
                refetchQueries: [
                    {query: GET_PRODUCTS_BY_UID_LIST, variables: {uidWishList: currentUIDWishList}},
                    'ProductsWishList'
                ],
            })

            console.log(dataProduct)
            onHide()
            setLinkProduct("")
            setDescriptionProduct("")
            setNameProduct("")
            setTypeMarketPlace(undefined)
            setLabels([])
        }
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
        setSubmitted(false);
        onHide()
    }

    const handleChangeChip = (e: ChipsChangeParams) => {
        setLabels(e.value)
    }

    const handleChangeLinkProduct: ChangeEventHandler<HTMLInputElement> = (e) => {
        let value: string = e.target.value
        if (value) {
            if (value.includes("ozon"))
                setTypeMarketPlace("OZON")
            else if (value.includes("wildberries"))
                setTypeMarketPlace("WB")
            else
                setTypeMarketPlace(undefined)
        }

        setLinkProduct(value)
    }

    const handleClearUrl = () => {
        if (linkProduct)
            setLinkProduct("")
    }

    const handleChangeNameProduct: ChangeEventHandler<HTMLInputElement> = (e) => {
        setNameProduct(prevState => e.target.value)
    }

    const handleChangeDescriptionProduct: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
        setDescriptionProduct(prevState => e.target.value)
    }

    return (
        <Dialog visible={visible} header={"Добавить желание"} className="p-fluid" modal style={{width: '450px'}}
                footer={footerContainer} onHide={hideDialog}>
            <div className="field">
                {
                    typeMarketPlace ? <label htmlFor="input-url" className="text-sm">
                        Ссылка из&nbsp;
                        <span className="text-primary font-medium text-lg">
                            {typeMarketPlace === "OZON" ? 'ozon' : 'wildberries'}
                        </span>
                    </label> : <label htmlFor="input-url" className="text-sm">
                        <span className="text-red-400 font-bold">Внимание!</span>
                        &nbsp;Ссылка на Ozon или Wildberries*</label>
                }
                <div id="input-url" className="mt-0 w-full">
                    <div className="p-inputgroup">
                                        <span className="p-inputgroup-addon">
                                            <i className="pi pi-link"/>
                                        </span>
                        <InputText placeholder="Ссылка на товар" value={linkProduct} autoFocus
                                   onChange={handleChangeLinkProduct}/>
                        <Button icon="pi pi-times" onClick={handleClearUrl}/>
                    </div>
                </div>

            </div>
            <div className="field">
                <label htmlFor="name">Название</label>
                <InputText id="name" required value={nameProduct} onChange={handleChangeNameProduct}/>

            </div>
            <div className="field">
                <label htmlFor="description">Описание</label>
                <InputTextarea id="description" autoResize required rows={3} cols={20} value={descriptionProduct}
                               onChange={handleChangeDescriptionProduct}/>
            </div>
            <div className="field">
                <label className="mb-3">Метки</label>
                <Chips className="w-full" value={labels} max={5} allowDuplicate={false} onChange={handleChangeChip}/>
            </div>
        </Dialog>
    )
}

export default ProductDialog
