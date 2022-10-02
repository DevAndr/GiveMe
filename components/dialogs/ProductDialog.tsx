import React, {ChangeEventHandler, FC, useEffect, useState} from "react";
import {Dialog} from "primereact/dialog";
import {Button} from "primereact/button";
import {RadioButton} from "primereact/radiobutton";
import {InputTextarea} from "primereact/inputtextarea";
import {classNames} from "primereact/utils";
import {InputText} from "primereact/inputtext";
import {InputNumber} from "primereact/inputnumber";
import {Chips, ChipsChangeParams} from "primereact/chips";
import {useMutation} from "@apollo/client";
import {IProduct, ParamsCreateProduct, RsponseProduct} from "../../services/graphql/types";
import {CREATE_PRODUCT_TO_LIST, GET_PRODUCTS_BY_UID_LIST} from "../../services/graphql";

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
    const [data, setData] = useState<IProduct>()
    const [linkProduct, setLinkProduct] = useState<string>()
    const [nameProduct, setNameProduct] = useState<string>()
    const [descriptionProduct, setDescriptionProduct] = useState<string>()


    const handleSave = async () => {
        if (linkProduct && nameProduct && currentUIDWishList) {

            const {data: dataProduct} = await createProduct({
                variables: {
                    data: {
                        uidWishList: currentUIDWishList,
                        name: nameProduct,
                        link: linkProduct,
                        description: descriptionProduct,
                        labels: labels
                    }
                },
                refetchQueries: [
                    {query: GET_PRODUCTS_BY_UID_LIST},
                    'ProductsWishList'
                ],
            })

            console.log(dataProduct)
            onHide()
            setLinkProduct("")
            setDescriptionProduct("")
            setNameProduct("")
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
        setLinkProduct(prevState => e.target.value)
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
                <label htmlFor="input-url" className="text-sm">Внимание! Ссылка на Ozon или Wildberries*</label>
                <div id="input-url" className="mt-0 w-full">
                    <div className="p-inputgroup">
                                        <span className="p-inputgroup-addon">
                                            <i className="pi pi-link"></i>
                                        </span>
                        <InputText placeholder="Ссылка на товар" value={linkProduct}
                                   onChange={handleChangeLinkProduct}/>
                        <Button icon="pi pi-clone"/>
                    </div>
                </div>

            </div>
            <div className="field">
                <label htmlFor="name">Название</label>
                <InputText id="name" required autoFocus value={nameProduct} onChange={handleChangeNameProduct}/>

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
