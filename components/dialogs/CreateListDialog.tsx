import React, {ChangeEventHandler, FC, useState} from 'react';
import {Dialog} from 'primereact/dialog';
import {InputText} from 'primereact/inputtext';
import './styles.scss'
import {InputTextarea} from 'primereact/inputtextarea';
import {Button} from 'primereact/button';
import {useMutation} from '@apollo/client';
import {ParamsCreateList, ResponseList} from '@/graphql/types';
import {CREATE_LIST} from '@/graphql';

interface CreateListDialogProps {
    visible: boolean
    onHide: () => void
}

const CreateListDialog: FC<CreateListDialogProps> = ({visible, onHide}) => {
    const [createList] = useMutation<ResponseList, ParamsCreateList>(CREATE_LIST);
    const [name, setName] = useState('')
    const [description, setDescription] = useState('');

    const changeNameHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
        setName(e.target.value);
    }

    const changeDescriptionHandler: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
        setDescription(prev => e.target.value);
    };

    const handleAddList = async (e: MouseEvent) => {
        e.preventDefault()

        if (name) {
            const {data: dataList} = await createList({
                variables: {
                    data: {
                        name: name,
                        description: description
                    }
                }
            });

            setName("");
            setDescription("");

            onHide()
        }
    };

    return (
        <Dialog className='create-list-dialog' visible={visible} header={'Добавить список'} modal onHide={onHide}>
            <div className="field">
                <label htmlFor="name">Название</label>
                <InputText id="name" required value={name} onChange={changeNameHandler}/>
            </div>
            <div className='field'>
                <InputTextarea className="w-full" rows={3} cols={30} autoResize
                               placeholder="Описание" value={description}
                               onChange={changeDescriptionHandler}/>
            </div>
            <div className='field mb-0'>
                <Button className="w-full" label="Добавить" icon="pi pi-plus" onClick={handleAddList}/>
            </div>
        </Dialog>
    );
};

export default CreateListDialog;