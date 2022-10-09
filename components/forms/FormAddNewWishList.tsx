import React, {ChangeEventHandler, FC, useState} from "react";
import {InputText} from "primereact/inputtext";
import {InputTextarea} from "primereact/inputtextarea";
import {Button} from "primereact/button";
import {useMutation} from "@apollo/client";
import {ParamsCreateList, ResponseList} from "../../services/graphql/types";
import {CREATE_LIST} from "../../services/graphql";

interface FormAddNewWishListProps {

}

const FormAddNewWishList: FC<FormAddNewWishListProps> = () => {
    const [createList] = useMutation<ResponseList, ParamsCreateList>(CREATE_LIST);
    const [nameList, setNameList] = useState<string>("")
    const [descriptionList, setDescriptionList] = useState<string>("")


    const handleChangeNameList: ChangeEventHandler<HTMLInputElement> = (e) => {
        setNameList(prev => e.target.value)
    }

    const handleChangeDescList: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
        setDescriptionList(prev => e.target.value)
    }

    const handleAddList = async () => {
        if (nameList) {
            const {data: dataList} = await createList({
                variables: {
                    data: {
                        name: nameList,
                        description: descriptionList
                    }
                }
            })

            console.log('FormAddNewWishList', dataList)
            setNameList("")
            setDescriptionList("")
        }
    }

    return (<div className="m-2 pl-4 pr-4">
        <h3 className={''}>Новый список</h3>
        <div className="card">
            <div className="p-fluid grid">
                <div className="field" style={{width: '-webkit-fill-available'}}>
                    <InputText type="text" className="p-inputtext-sm block p-2"
                               placeholder="Имя списка" value={nameList}
                               onChange={handleChangeNameList}/>
                </div>
                <div className="field" style={{width: '-webkit-fill-available'}}>
                    <InputTextarea className="p-2" rows={3} cols={30} autoResize
                                   placeholder="Описание" value={descriptionList}
                                   onChange={handleChangeDescList}/>
                </div>
                <div className="field" style={{width: '-webkit-fill-available'}}>
                    <Button label="Добавить" icon="pi pi-plus" onClick={handleAddList}/>
                </div>
            </div>
        </div>
    </div>)
}

export default FormAddNewWishList
