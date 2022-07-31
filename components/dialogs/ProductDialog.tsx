import React, {FC, useEffect, useState} from "react";
import {Dialog} from "primereact/dialog";
import {Button} from "primereact/button";
import {RadioButton} from "primereact/radiobutton";
import {InputTextarea} from "primereact/inputtextarea";
import {classNames} from "primereact/utils";
import {InputText} from "primereact/inputtext";
import {InputNumber} from "primereact/inputnumber";
import {Chips, ChipsChangeParams} from "primereact/chips";

interface IProductDialog {
    visible: boolean
    onHide: Function
}

interface IProduct {
    link: string
    img: string
    name: string
    description: string
    labels?: string[]
}

const ProductDialog: FC<IProductDialog> = ({visible, onHide}) => {
    const [isSHow, setIsSHow] = useState(visible)
    const [submitted, setSubmitted] = useState(true)
    const [labels, setLabels] = useState<any[]>([])
    const [data, setData] = useState<IProduct>()

    useEffect(() => {
        setIsSHow(visible)
    }, [visible])

    const handleSave = () => {
        setIsSHow(false)
    }

    const handleCancel = () => {
        setIsSHow(false)
    }

    const footerContainer = () => {
        return <>
            <Button label="Отмена" icon="pi pi-times" className="p-button-outlined p-button-sm" onClick={handleCancel}/>
            <Button label="Добавить" icon="pi pi-check" className="p-button p-button-sm" onClick={handleSave}/>
        </>
    }

    const hideDialog = () => {
        setSubmitted(false);
        setIsSHow(false);
        onHide()
    }

    const handleChangeChip = (e: ChipsChangeParams) => {
        console.log('handleChangeChip', e.value)

        setLabels(e.value)
    }

    return (
        <Dialog visible={isSHow} header={"Добавить желание"} className="p-fluid" modal style={{width: '450px'}}
                footer={footerContainer} onHide={hideDialog}>
            <div className="field">
                <label htmlFor="input-url" className="text-sm">Внимание! Ссылка на Ozon или Wildberries*</label>
                <div id="input-url" className="mt-0 w-full">
                    <div className="p-inputgroup">
                                        <span className="p-inputgroup-addon">
                                            <i className="pi pi-link"></i>
                                        </span>
                        <InputText placeholder="Ссылка на товар"/>
                        <Button icon="pi pi-clone"/>
                    </div>
                </div>

            </div>
            <div className="field">
                <label htmlFor="name">Имя подарка</label>
                <InputText id="name" required autoFocus/>

            </div>
            <div className="field">
                <label htmlFor="description">Описание</label>
                <InputTextarea id="description" autoResize required rows={3} cols={20}/>
            </div>
            <div className="field">
                <label className="mb-3">Метки</label>
                <Chips className="w-full" value={labels} max={5} allowDuplicate={false} onChange={handleChangeChip}/>
            </div>
        </Dialog>
    )
}

export default ProductDialog
