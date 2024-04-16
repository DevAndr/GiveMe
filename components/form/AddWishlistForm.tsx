import React, {ChangeEventHandler, FC, useState} from 'react';
import {CREATE_LIST} from '@/graphql';
import {ParamsCreateList, ResponseList} from '@/graphql/types';
import {useMutation} from '@apollo/client';
import {InputText} from 'primereact/inputtext';
import {InputTextarea} from 'primereact/inputtextarea';
import {Button} from 'primereact/button';
import './styles.scss'

interface AddWishlistFormProps {

}

const AddWishlistForm: FC<AddWishlistFormProps> = ({}) => {
    const [createList] = useMutation<ResponseList, ParamsCreateList>(CREATE_LIST);
    const [nameList, setNameList] = useState<string>("");
    const [descriptionList, setDescriptionList] = useState<string>("");

    const handleChangeNameList: ChangeEventHandler<HTMLInputElement> = (e) => {
        setNameList(prev => e.target.value);
    };

    const handleChangeDescList: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
        setDescriptionList(prev => e.target.value);
    };

    const handleAddList = async (e: MouseEvent) => {
        e.preventDefault()

        if (nameList) {
            const {data: dataList} = await createList({
                variables: {
                    data: {
                        name: nameList,
                        description: descriptionList
                    }
                }
            });

            console.log('FormAddNewWishList', dataList);
            setNameList("");
            setDescriptionList("");
        }
    };
    return (<div className='wrap-new-wish-list'>
        <h5>Новый список</h5>
        <form className='form-wish-list'>
            <div className='field'>
                <InputText className="w-full" type="text" placeholder="Имя списка" value={nameList}
                           onChange={handleChangeNameList}/>
            </div>
            <div className='field'>
                <InputTextarea className="w-full" rows={3} cols={30} autoResize
                               placeholder="Описание" value={descriptionList}
                               onChange={handleChangeDescList}/>
            </div>
            <div className='field'>
                <Button className="w-full" label="Добавить" icon="pi pi-plus" onClick={handleAddList}/>
            </div>
        </form>
    </div>);
};

export default AddWishlistForm;