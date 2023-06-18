import React, {ChangeEventHandler, FC, useState} from "react";
import {InputText} from "primereact/inputtext";
import {InputTextarea} from "primereact/inputtextarea";
import {Button} from "primereact/button";
import {useMutation} from "@apollo/client";
import {ParamsCreateList, ResponseList} from "../../services/graphql/types";
import {CREATE_LIST} from "../../services/graphql";
import style from './FormAddNewWishList.module.scss'

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

    return (<div className={style.formNewWishList}>
        <h3>Новый список</h3>
        <div className={style.form}>
            <div className={style.field}>
                <InputText className="w-full" type="text" placeholder="Имя списка" value={nameList}
                           onChange={handleChangeNameList}/>
            </div>
            <div className={style.field}>
                <InputTextarea className="w-full" rows={3} cols={30} autoResize
                               placeholder="Описание" value={descriptionList}
                               onChange={handleChangeDescList}/>
            </div>
            <div className={style.field}>
                <Button className="w-full" label="Добавить" icon="pi pi-plus" onClick={handleAddList}/>
            </div>
        </div>
    </div>)
}

export default FormAddNewWishList
