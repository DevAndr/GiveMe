import {NextPage} from "next";
import Head from "next/head";
import MainLayout from "../components/layouts/MainLayout";
import React, {useRef, useState, MouseEvent, useEffect} from "react";
import {Splitter, SplitterPanel} from "primereact/splitter";
import {DataScroller} from "primereact/datascroller";
import {Button} from "primereact/button";
import MultiCheckbox from "../components/multi-chekbox";
import {ConfirmPopup, confirmPopup} from "primereact/confirmpopup";
import {Toast} from "primereact/toast";
import {InputText} from "primereact/inputtext";
import {Toolbar} from "primereact/toolbar";
import {DataTable, DataTableSelectionChangeParams} from "primereact/datatable";
import {Column} from "primereact/column";
import {Chips} from "primereact/chips";
import ProductDialog from "../components/dialogs/ProductDialog";
import {InputTextarea} from "primereact/inputtextarea";
import {Dialog} from "primereact/dialog";
import {Skeleton} from 'primereact/skeleton';
import {
    IList, ParamsProductsWIshList,
    ParamsSubCreatedList,
    ParamsSubRemoveList, ResponseProducts,
    SubCreatedList,
    SubRemoveList
} from "../services/graphql/types";
import {
    GET_PRODUCTS_BY_UID_LIST,
    SUB_CREATED_LIST,
    SUB_LIST,
    useGetListsCurrentUser, useRemoveList, useRemoveProducts, useUpdateEditorProducts, useUpdateWishList
} from "../services/graphql";
import {IoIosGift} from "react-icons/io";
import styled from 'styled-components';
import style from '../styles/editList.module.scss'
import FormAddNewWishList from "../components/forms/FormAddNewWishList";
import {useQuery} from "@apollo/client";
import {Empty} from "../components/info";
import MarketPlace from "../components/marketPlace";

const TitleItemWishList = styled.h1`
  margin: 0;
  font-size: 1rem !important;
  font-weight: 700 !important;
`;

const EditList: NextPage = () => {
    const removeList = useRemoveList();
    const {
        subscribeToMore,
        loading: loadingLists,
        error: errorLists,
        data: dataWishLists
    } = useGetListsCurrentUser();

    const updateWishList = useUpdateWishList();

    const removeProducts = useRemoveProducts()

    const updateProduct = useUpdateEditorProducts()

    // const [updateWishList, { data: updatedWishList, loading: loadingUpdateWishList, error: errorUpdatedWishList }] =
    //     useMutation<ParamsUpdateWishList, ResponseUpdateWishList>(UPDATE_LIST, {
    //         refetchQueries: [
    //             {query: GET_LISTS_CURRENT_USER},
    //             'WishListsCurrentUser'
    //         ],
    //         awaitRefetchQueries: true
    // });

    const [visible, setVisible] = useState<boolean>(false);
    const [showDialog, setShowDialog] = useState(false)
    const [showDeleteDialog, setShowDeleteDialog] = useState(false)
    const [selectedProducts, setSelectedProducts] = useState<any[]>([])
    const [currentWishList, setCurrentWishList] = useState<IList | null>(null)
    const refToast = useRef<null | any>(null);
    const {
        loading: loadingProductsWL,
        error: errorWL,
        data: dataWL,
        // refetch: refetchProducts
    } = useQuery<ResponseProducts, ParamsProductsWIshList>(GET_PRODUCTS_BY_UID_LIST, {
        variables: {
            uidWishList: currentWishList ? currentWishList?.uid : ""
        },
        pollInterval: 1000
    })

    useEffect(() => {
        subscribeToMore<SubCreatedList, ParamsSubCreatedList>({
            document: SUB_CREATED_LIST, variables: {
                uidUser: '7b780467-9055-4b81-9879-46f4413228ff'
            },
            updateQuery: (prev, {subscriptionData}) => {
                if (!subscriptionData.data) return prev;

                console.log('subscribeToMore', subscriptionData.data)

                const newList = subscriptionData.data.listCreated;

                return Object.assign({}, prev, {
                    wishListsCurrentUser: [...prev.wishListsCurrentUser, newList]
                });
            }
        });

        //ws событие удаленного списка от сервера
        subscribeToMore<SubRemoveList, ParamsSubRemoveList>({
            document: SUB_LIST, variables: {
                uidUser: 'e9866c02-3029-46ab-997e-1f99d2668248'
            },
            updateQuery: (prev, {subscriptionData: {data}}) => {
                if (!data) return prev;

                const removeList = data.list;

                return Object.assign({}, prev, {
                    wishListsCurrentUser: prev.wishListsCurrentUser.filter(list => list.uid !== removeList.uid)
                });
            }
        });
    }, [])

    const accept = () => {
        refToast?.current.show({severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000});
    };

    const reject = () => {
        refToast?.current.show({severity: 'warn', summary: 'Rejected', detail: 'You have rejected', life: 3000});
    };

    function confirm(event: MouseEvent<HTMLElement>) {
        confirmPopup({
            target: event.currentTarget,
            message: 'Удалить список?',
            icon: 'pi pi-info-circle',
            acceptClassName: 'p-button-danger',
            className: style.confirmPopup,
            rejectLabel: "Нет",
            acceptLabel: "Да",
            accept: this.accept,
            reject: this.reject
        });
    }

    const itemWishListTemplate = (data: IList) => {
        return (
            <div id="item" className={`flex align-items-center p-2 w-full justify-content-between hover:text-primary
             border-round mb-1 mt-1 hover:bg-black-alpha-10 ${currentWishList?.uid === data.uid && 'text-primary bg-primary-100'}`}
                 onClick={(e) => {
                     setCurrentWishList(data)
                 }}>
                <ConfirmPopup/>
                <div id="item-title" className="product-detail cursor-pointer">
                    <TitleItemWishList>{data.name}</TitleItemWishList>
                    <p className=' m-0 mt-2 mb-1'>{data?.description}</p>
                    <div className={style.indicatorGiftsList}>получено: <span
                        className="font-medium">4</span>/10<IoIosGift color="#A855F7"/></div>
                </div>
                <div className="flex flex-column align-items-end" onClick={(e) => e.stopPropagation()}>
                    <MultiCheckbox value={data.access} onChange={async (value) => {
                        await updateWishList({data: {access: value, uid: data.uid, uidUser: data.uidUser}})
                    }}/>
                    <br/>
                    <Button icon="pi pi-times" tooltip="Удалить" tooltipOptions={{position: "right"}}
                            className={`p-button-rounded p-button-help p-button-outlined border-round p-2 w-1rem
                             h-1rem ${style.btnRemoveList}`}
                            aria-label="Удалить" onClick={(e) => {
                        confirm.bind({
                            accept: async () => {
                                const {data: removedList} = await removeList(
                                    data.uid
                                )

                                console.log('accept', removedList)
                            }, reject
                        })(e)
                    }}/>
                </div>
            </div>
        );
    }

    const handleShowDeleteDialog = () => {
        setShowDeleteDialog(true)
    }

    const leftToolbarTemplate = () => {
        return (
            <>
                <Button label="Добавить" icon="pi pi-plus" className="p-button mr-2 p-button-sm"
                        onClick={handleAddProduct}/>
                <Button label={`Удалить ${selectedProducts.length > 0 ? `(${selectedProducts.length})` : ''}`}
                        icon="pi pi-trash" className="p-button-danger p-button-sm"
                        onClick={handleShowDeleteDialog} disabled={!selectedProducts || !selectedProducts.length}/>
            </>
        )
    }

    const getLinkToWishList = (): string => {
        const urlViewList = `/viewList/${currentWishList?.uidUser}/${currentWishList?.uid}`
        return urlViewList
    }

    const rightToolbarTemplate = () => {
        return (
            <div className="flex gap-2">
                <Button label="Копировать ссылку" icon="pi pi-clone p-button-sm"
                        className="p-button p-button-sm" onClick={handleCopyUrl}/>
                <Button label="Демонстрация" icon="pi pi-eye p-button-sm"
                        className="p-button p-button-sm" onClick={handleViewWishList}/>
            </div>
        )
    }

    const handleCopyUrl = () => {
        const urlViewList = getLinkToWishList()
        console.log(urlViewList)
        refToast.current.show({severity: 'success', summary: 'Готово', detail: 'Скопировано', life: 3000});
    }

    const handleViewWishList = () => {
        const urlViewList = getLinkToWishList()
        console.log(urlViewList)
    }

    const imageBodyTemplate = (rowData: any) => {
        return <img src={`${rowData.img}`}
                    onError={(e: any) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'}
                    alt={rowData.image} className="w-4rem"/>
    }

    const marketTypeView = (rowData: any) => {
        return <MarketPlace type={rowData.marketPlace}/>
    }

    const labelBodyTemplate = (rowData: any) => {
        const labels = rowData?.labels
        return <Chips value={labels} max={5} allowDuplicate={false} readOnly className="hover:border-transparent"/>
    }

    const handleAddProduct = () => {
        setShowDialog(true)
    }

    const handleSelectionChange = (e: DataTableSelectionChangeParams) => {
        if (e.type === 'checkbox' || e.type === 'all') {
            setSelectedProducts(e.value)
        }
    }

    const inputTextEditor = (props, field) => {
        return <InputText className="w-full" type="text" value={props.rowData[field]}
                          onChange={(e) => props.editorCallback(e.target.value)}/>;
    }

    const nameEditor = (props) => {
        return inputTextEditor(props, 'name');
    }

    const descriptionEditor = (options) => {
        return <InputTextarea className="w-full" value={options.value}
                              onChange={(e) => options.editorCallback(e.target.value)} rows={5}
                              cols={30}/>
    }

    const labelsEditor = (options) => {
        return <Chips value={options.value} onChange={(e) => options.editorCallback(e.target.value)}/>
    }

    const handleRowEditComplete = async (e) => {
        let {newData, index} = e
        await updateProduct(newData.uidWishList, newData)

        // refetchProducts({uidWishList: currentWishList.uid})
    }

    const hideDeleteProductDialog = () => {
        setShowDeleteDialog(false)
    }

    const handleDeleteSelectedProducts = async () => {
        const {errors} = await removeProducts(currentWishList?.uid, selectedProducts.map(sp => sp.uid))
        setShowDeleteDialog(false);
        setSelectedProducts([]);

        refToast.current.show({severity: 'success', summary: 'Готово', detail: 'Желания удалены!', life: 3000});

        if (errors)
            refToast.current.show({
                severity: 'error',
                summary: 'Внимание',
                detail: 'Не удалось удалить желания ',
                life: 3000
            });
    }

    const deleteProductsDialogFooter = (
        <>
            <Button label="Нет" icon="pi pi-times" className="p-button-outlined p-button-sm"
                    onClick={hideDeleteProductDialog}/>
            <Button label="Да" icon="pi pi-check" className="p-button p-button-sm"
                    onClick={handleDeleteSelectedProducts}/>
        </>
    );

    const SkeletonProductsList = (
        <>
            <DataTable value={[1, 2, 3, 4, 5]} className="p-datatable-striped">
                <Column field="img" style={{width: '25%'}} body={<Skeleton/>}/>
                <Column field="name" header="Имя" style={{width: '25%'}} body={<Skeleton/>}/>
                <Column field="description" header="Описание" style={{width: '25%'}} body={<Skeleton/>}/>
                <Column field="labels" header="Метки" style={{width: '25%'}} body={<Skeleton/>}/>
            </DataTable>
        </>
    )

    const SkeletonWishList = (
        <div className="p-4">
            <ul className="m-0 p-0 list-none">
                <li className="mb-4">
                    <div className="flex">
                        <div style={{flex: '1'}}>
                            <Skeleton width="100%" className="mb-2"/>
                            <Skeleton width="75%"/>
                        </div>
                    </div>
                </li>
                <li className="mb-4">
                    <div className="flex">
                        <div style={{flex: '1'}}>
                            <Skeleton width="100%" className="mb-2"/>
                            <Skeleton width="75%"/>
                        </div>
                    </div>
                </li>
                <li className="mb-4">
                    <div className="flex">
                        <div style={{flex: '1'}}>
                            <Skeleton width="100%" className="mb-2"/>
                            <Skeleton width="75%"/>
                        </div>
                    </div>
                </li>
                <li>
                    <div className="flex">
                        <div style={{flex: '1'}}>
                            <Skeleton width="100%" className="mb-2"/>
                            <Skeleton width="75%"/>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    )

    const loadingTemplate = () => {
        return (
            <div className="flex align-items-center" style={{height: '50px', flexGrow: '1', overflow: 'hidden'}}>
                <Skeleton width={'60%'} height="1rem"/>
            </div>
        )
    }

    return (
        <>
            <Head>
                <title>Give Me: Управление списком</title>
                <meta name="description" content="Generated by create next app"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <MainLayout isHideMenu={false}>
                <div className="card justify-content-between w-full h-screen">
                    <Splitter className={`mb-5 w-full h-full sliderSplitter`}>
                        <SplitterPanel className="flex align-items-center justify-content-center" size={20}
                                       minSize={10}>
                            <div className="w-full h-full flex flex-column">
                                {
                                    loadingLists ? SkeletonWishList : dataWishLists?.wishListsCurrentUser &&
                                        <DataScroller className="w-full" value={dataWishLists?.wishListsCurrentUser}
                                                      itemTemplate={itemWishListTemplate}
                                                      rows={10} inline scrollHeight="500px"/>
                                }
                                <FormAddNewWishList/>
                            </div>
                        </SplitterPanel>
                        <SplitterPanel className="flex" size={80} minSize={60}>
                            <div className="flex flex-column align-self-baseline p-5 w-full h-full">
                                <div className="overflow-hidden" style={{height: 'calc(100vh - 210px)'}}>
                                    {
                                        loadingProductsWL ?
                                            SkeletonProductsList :
                                            <DataTable editMode="row"
                                                       dataKey="uid"
                                                       resizableColumns emptyMessage={<Empty/>}
                                                       value={dataWL?.productsWishList} paginator rows={10} first={0}
                                                       selection={selectedProducts}
                                                       onSelectionChange={handleSelectionChange}
                                                       onRowEditComplete={handleRowEditComplete}
                                                       scrollable scrollHeight="flex" responsiveLayout="scroll"
                                                       className={style.tableProducts} size="small">
                                                <Column selectionMode="multiple" headerStyle={{width: '.1rem'}}
                                                        exportable={false} style={{flex: '3rem 0 0'}}/>
                                                <Column field="img" body={imageBodyTemplate}
                                                        style={{flex: '0 0 8rem'}}/>
                                                <Column field="name" bodyStyle={{fontWeight: 500}} editor={nameEditor}
                                                        header="Имя" sortable style={{flex: '0 0 10rem'}}/>
                                                <Column field="description" header="Описание"
                                                        editor={descriptionEditor}/>
                                                <Column field="marketPlace" header="Магазин" body={marketTypeView}
                                                        style={{flex: '0 0 8rem'}} headerStyle={{width: '.1rem'}}/>
                                                <Column field="labels" header="Метки" body={labelBodyTemplate}
                                                        editor={labelsEditor}/>
                                                <Column rowEditor headerStyle={{width: '1rem'}}
                                                        bodyStyle={{textAlign: 'center'}}/>
                                            </DataTable>
                                    }
                                </div>
                                <div className="flex align-items-center justify-content-between flex-column bottom-0">
                                    <Toolbar className="w-full p-2" left={leftToolbarTemplate}
                                             right={rightToolbarTemplate}/>
                                </div>
                                <div className="grid p-fluid pt-3">
                                    <div className="col">
                                        <span className="p-float-label w-full">
                                            <InputText id="name-list" className="font-medium p-inputtext-sm"
                                                       value={currentWishList?.name}
                                                       onChange={(e) =>
                                                           setCurrentWishList({
                                                               ...currentWishList,
                                                               name: e.target.value
                                                           })
                                                       }/>
                                            <label htmlFor="name-list">Имя списка</label>
                                        </span>
                                        <div className="w-full pt-2">
                                            <InputTextarea autoResize placeholder="Описание"/>
                                        </div>
                                    </div>
                                    <div className="flex">
                                        <div className="col" style={{placeSelf: "end"}}>
                                            <Button className="p-button p-button-sm" label="Сохранить"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <ProductDialog currentUIDWishList={currentWishList?.uid} visible={showDialog}
                                           onShow={handleAddProduct} onHide={() => {
                                setShowDialog(false)
                            }}/>
                        </SplitterPanel>
                    </Splitter>
                    <ConfirmPopup visible={visible} onHide={() => setVisible(false)} icon="pi pi-exclamation-triangle"
                                  accept={accept} reject={reject}/>
                    <Dialog visible={showDeleteDialog} style={{width: '450px'}}
                            header="Удалить желания" modal footer={deleteProductsDialogFooter}
                            onHide={hideDeleteProductDialog}>
                        <div className="confirmation-content">
                            <i className="pi pi-exclamation-triangle mr-3" style={{fontSize: '2rem'}}/>
                            {selectedProducts.length &&
                                <span>Вы уверены, что хотите удалить <b>{selectedProducts.length}</b> желания?</span>}
                        </div>
                    </Dialog>
                </div>
                <Toast ref={refToast} position="bottom-right"/>
            </MainLayout>
        </>
    )
}

export default EditList
