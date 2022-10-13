import React, {FC, useState} from "react";
import style from "../../styles/editList.module.scss";
import {Button} from "primereact/button";

interface IEditableWrapper {
    children: React.ReactNode
    editableView: React.ReactNode
}

const EditableWrapper: FC<IEditableWrapper> = (props) => {
    const {children, editableView} = props
    const [isEdit, setIsEdit] = useState(false)

    const handleEditWishList = () => {
      setIsEdit(prevState => !prevState)
    }

    return (
        <div className="flex w-full">
            <Button icon={`pi ${isEdit ? 'pi-check' : 'pi-pencil'}`}
                    tooltip={isEdit ? "Готово" : "Редактировать"}
                    tooltipOptions={{position: "right"}}
                    className={`p-button-rounded p-button-help p-button-outlined border-round ${style.btnSmall} mr-2`}
                    aria-label={isEdit ? "Готово" : "Редактировать"} onClick={handleEditWishList}/>
            {
                isEdit ? (editableView) : (children)
            }
        </div>
    )
}

export default EditableWrapper
