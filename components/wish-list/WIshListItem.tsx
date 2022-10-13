import React, {FC, MouseEvent, useEffect, useState} from "react";
import {IList} from "../../services/graphql/types";
import {ConfirmPopup} from "primereact/confirmpopup";
import style from "../../styles/editList.module.scss";
import {IoIosGift} from "react-icons/io";
import {AiOutlineInfoCircle} from "react-icons/ai";
import MultiCheckbox from "../multi-chekbox";
import {Button} from "primereact/button";
import {DescriptionItemWishList, TitleItemWishList} from "../../pages/editList";
import {useRemoveList, useUpdateWishList} from "../../services/graphql";
import EditableWrapper from "../editable";
import {InputText} from "primereact/inputtext";
import {InputTextarea} from "primereact/inputtextarea";


interface IWIshListItem {
    data: IList
    currentWishList?: IList
    onSetCurrentWishList: (data: IList) => void
    onRemoveWishList?: (uidList: string) => Promise<any>
    confirm: (event: MouseEvent<HTMLElement>) => void
}

const WIshListItem: FC<IWIshListItem> = (props) => {
    const {data, currentWishList, confirm, onSetCurrentWishList, onRemoveWishList} = props
    const removeList = useRemoveList();
    const updateWishList = useUpdateWishList();
    const [isEdit, setIsEdit] = useState(false)

    let countCompleteProduct = data.products?.reduce((prev, cur) => cur.status === "COMPLETED" ? prev + 1 : prev, 0)

    const handleEditWishList = () => {
        setIsEdit(prevState => !prevState)
    }

    return (
        <EditableWrapper isEdit={isEdit}
            // editableView={(<div>Edit</div>)}
                         onChangeEditable={(data: boolean) => {
                             setIsEdit(data)
                         }}>
            <div id="item" className={`flex align-items-center p-2 w-full justify-content-between hover:text-primary
             border-round mb-1 mt-1 hover:bg-black-alpha-10 ${currentWishList?.uid === data.uid && 'text-primary bg-primary-100'}`}
                 onClick={(e) => {
                     // setCurrentWishList(data)
                     onSetCurrentWishList(data)
                 }}>
                <div id="item-title" className="product-detail cursor-pointer">
                    {
                        isEdit ? <>
                            <div className="w-full flex flex-column row-gap-2">
                                <InputText className="p-inputtext-sm" value={data.name}/>
                                <InputTextarea rows={2} autoResize>{data.description}</InputTextarea>
                            </div>
                        </> : <>
                            <TitleItemWishList>{data.name}</TitleItemWishList><br/>
                            <DescriptionItemWishList isEmpty={data.description}>{data.description}</DescriptionItemWishList>
                        </>
                    }
                    <div className={style.indicatorGiftsList}>
                        {
                            data?.products?.length ? <>
                                подарено:
                                <div>
                                    <span
                                        className={`${countCompleteProduct && 'font-medium'}`}>{countCompleteProduct}</span>
                                    <span className="font-medium">/{data?.products?.length}</span>
                                </div>
                                <IoIosGift color="#A855F7"/>
                            </> : <div className="flex gap-1 align-items-end">
                                <AiOutlineInfoCircle className="text-gray-500"/>
                                <div className="text-gray-500">
                                    <span className={`${countCompleteProduct && 'font-medium'}`}>пусто</span>
                                </div>

                            </div>
                        }
                    </div>
                </div>
                <div className="flex flex-column align-items-end" onClick={(e) => e.stopPropagation()}>
                    <MultiCheckbox value={data.access} onChange={async (value) => {
                        await updateWishList({data: {access: value, uid: data.uid, uidUser: data.uidUser}})
                    }}/>
                    <br/>
                    <div className="gap-3 flex">
                        <Button icon={`pi ${isEdit ? 'pi-check' : 'pi-pencil'}`}
                                tooltip={isEdit ? "Готово" : "Редактировать"}
                                tooltipOptions={{position: "right"}}
                                className={`p-button-rounded p-button-help p-button-outlined border-round ${style.btnSmall}`}
                                aria-label={isEdit ? "Готово" : "Редактировать"} onClick={handleEditWishList}/>

                        <Button icon="pi pi-times" tooltip="Удалить" tooltipOptions={{position: "right"}}
                                className={`p-button-rounded p-button-help p-button-outlined border-round p-2 w-1rem
                             h-1rem ${style.btnSmall} ${style.delete}`}
                                aria-label="Удалить" onClick={(e) => {
                            confirm.bind({
                                accept: async () => {
                                    const {data: removedList} = await removeList(data.uid)
                                }, reject: {}
                            })(e)
                        }}/>
                    </div>
                </div>
                <ConfirmPopup/>
            </div>
        </EditableWrapper>
    )
}

export default WIshListItem
