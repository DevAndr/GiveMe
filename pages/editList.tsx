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
    useGetListsCurrentUser, useRemoveList, useUpdateWishList
} from "../services/graphql";
import {IoIosGift} from "react-icons/io";
import styled from 'styled-components';
import style from '../styles/editList.module.scss'
import FormAddNewWishList from "../components/forms/FormAddNewWishList";
import {useQuery} from "@apollo/client";

const TitleItemWishList = styled.h1`
  font-size: 1rem !important;
  font-weight: 700 !important;
`;

const dataTable = {
    data: [
        {
            id: 1000,
            name: "Сладости",
            count: 3
        },
        {
            id: 1001,
            name: "Шмотки",
            count: 12
        },
        {
            id: 1003,
            name: "fsdfsadf",
            count: 22
        },
    ]
}

const dataListTemp =
    [
        {
            id: 1000,
            name: "dddd",
            img: 'https://images.wbstatic.net/big/new/30150000/30154022-1.jpg',
            description: "Вот бы сейчас....",
            count: 3
        },
        {
            id: 1000,
            name: "hgfhkhjk",
            img: 'https://images.wbstatic.net/big/new/30150000/30154022-1.jpg',
            description: "Вот бы сейчас....",
            count: 3
        },
        {
            id: 1000,
            name: "jkhjkk Ммммм",
            img: 'https://images.wbstatic.net/big/new/30150000/30154022-1.jpg',
            description: "Вот бы сейчас....",
            count: 3
        },
        {
            id: 1001,
            name: "Для учебы",
            img: 'https://images.wbstatic.net/big/new/13650000/13650421-1.jpg',
            description: "Готовлюсь к 1 сентября)",
            labels: [
                "Hot", "Cool", "Yep", "Yep", "Happy"
            ],
            count: 12
        },
        {
            id: 1001,
            name: "Для учебы",
            img: 'https://images.wbstatic.net/big/new/13650000/13650421-1.jpg',
            description: "Готовлюсь к 1 сентября)",
            labels: [
                "Hot", "Cool", "Yep", "Yep", "Happy"
            ],
            count: 12
        },
        {
            id: 1003,
            name: "Вазелин",
            img: 'https://images.wbstatic.net/big/new/42200000/42202571-1.jpg',
            description: "На всякий случай",
            labels: [
                "Хочу"
            ],
            count: 22
        },
        {
            id: 1003,
            name: "Вазелин",
            img: 'https://images.wbstatic.net/big/new/42200000/42202571-1.jpg',
            description: "На всякий случай",
            labels: [
                "Хочу"
            ],
            count: 22
        },
        {
            id: 1000,
            name: "ghjghj",
            img: 'https://images.wbstatic.net/big/new/30150000/30154022-1.jpg',
            description: "Вот бы сейчас....",
            count: 3
        },
        {
            id: 1000,
            name: "gjghfjgfhk fghk",
            img: 'https://images.wbstatic.net/big/new/30150000/30154022-1.jpg',
            description: "Вот бы сейчас....",
            count: 3
        },
        {
            id: 1000,
            name: "hjkhjkhjk",
            img: 'https://images.wbstatic.net/big/new/30150000/30154022-1.jpg',
            description: "Вот бы сейчас....",
            count: 3
        },
        {
            id: 1001,
            name: "Для учебы",
            img: 'https://images.wbstatic.net/big/new/13650000/13650421-1.jpg',
            description: "Готовлюсь к 1 сентября)",
            labels: [
                "Hot", "Cool", "Yep", "Yep", "Happy"
            ],
            count: 12
        },
        {
            id: 1001,
            name: "Для учебы",
            img: 'https://images.wbstatic.net/big/new/13650000/13650421-1.jpg',
            description: "Готовлюсь к 1 сентября)",
            labels: [
                "Hot", "Cool", "Yep", "Yep", "Happy"
            ],
            count: 12
        },
        {
            id: 1003,
            name: "Вазелин",
            img: 'https://images.wbstatic.net/big/new/42200000/42202571-1.jpg',
            description: "На всякий случай",
            labels: [
                "Хочу"
            ],
            count: 22
        },
        {
            id: 1003,
            name: "Вазелин",
            img: 'https://images.wbstatic.net/big/new/42200000/42202571-1.jpg',
            description: "На всякий случай",
            labels: [
                "Хочу"
            ],
            count: 22
        }
    ]

const EditList: NextPage = () => {
    const removeList = useRemoveList();
    const {
        subscribeToMore,
        loading: loadingLists,
        error: errorLists,
        data: dataWishLists
    } = useGetListsCurrentUser();

    const updateWishList = useUpdateWishList();

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
    const [currentWishList, setCurrentWishList] = useState<IList>(null)
    const refToast = useRef<null | any>(null);
    const {loading: loadingProductsWL, error: errorWL, data: dataWL, subscribeToMore: subscribeProducts} =
        useQuery<ResponseProducts, ParamsProductsWIshList>(GET_PRODUCTS_BY_UID_LIST, {
            variables: {
                uidWishList: currentWishList ? currentWishList?.uid : ""
            }
        })
    const [products, setProducts] = useState(dataWL?.productsWishList)

    useEffect(() => {
        subscribeToMore<SubCreatedList, ParamsSubCreatedList>({
            document: SUB_CREATED_LIST, variables: {
                uidUser: 'e9866c02-3029-46ab-997e-1f99d2668248'
            },
            updateQuery: (prev, {subscriptionData}) => {
                if (!subscriptionData.data) return prev;

                console.log(subscriptionData.data)

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
            <div id="item"
                 className="flex align-items-center p-2 w-full justify-content-between hover:text-primary
                 hover:bg-black-alpha-10" onClick={(e) => {
                console.log('click item list', data)
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
                        // updateWishList({variables: {data: {access: value, uid: data.uid}}})
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
                <Button label="Удалить" icon="pi pi-trash" className="p-button-danger p-button-sm"
                        onClick={handleShowDeleteDialog} disabled={!selectedProducts || !selectedProducts.length}/>
            </>
        )
    }

    const rightToolbarTemplate = () => {
        return (
            <>
                <Button label="Копировать ссылку" icon="pi pi-clone p-button-sm" className="p-button p-button-sm"
                        onClick={handleCopyUrl}/>
            </>
        )
    }

    const handleCopyUrl = () => {
        refToast.current.show({severity: 'success', summary: 'Готово', detail: 'Скопировано', life: 3000});
    }

    const imageBodyTemplate = (rowData: any) => {
        return <img src={`${rowData.img}`}
                    onError={(e: any) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'}
                    alt={rowData.image} className="w-4rem"/>
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
        return <InputText type="text" value={props.rowData[field]}
                          onChange={(e) => props.editorCallback(e.target.value)}/>;
    }

    const nameEditor = (props) => {
        return inputTextEditor(props, 'name');
    }

    const descriptionEditor = (options) => {
        return <InputTextarea value={options.value} onChange={(e) => options.editorCallback(e.target.value)} rows={5}
                              cols={30}/>
    }

    const labelsEditor = (options) => {
        return <Chips value={options.value} onChange={(e) => options.editorCallback(e.target.value)}/>
    }

    const handleRowEditComplete = (e) => {
        let _dataList = [...products];
        let {newData, index} = e;

        _dataList[index] = newData;

        setProducts(_dataList);
    }

    const hideDeleteProductDialog = () => {
        setShowDeleteDialog(false)
    }

    const handleDeleteSelectedProducts = () => {
        const filteredProducts = products.filter(val => !selectedProducts.includes(val));
        setProducts(filteredProducts);
        setShowDeleteDialog(false);
        setSelectedProducts([]);
        refToast.current.show({severity: 'success', summary: 'Готово', detail: 'Желания удалены!', life: 3000});
    }

    const deleteProductsDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-outlined p-button-sm"
                    onClick={hideDeleteProductDialog}/>
            <Button label="Yes" icon="pi pi-check" className="p-button p-button-sm"
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
            <div className="flex align-items-center" style={{ height: '50px', flexGrow: '1', overflow: 'hidden' }} >
                <Skeleton width={'60%'} height="1rem" />
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
                                <div className="grid p-fluid">
                                        <span className="p-float-label w-full">
                                            <InputText id="name-list" className="font-medium p-inputtext-sm" value={currentWishList?.name}
                                                       onChange={(e) =>
                                                           setCurrentWishList({...currentWishList, name: e.target.value})
                                                       }/>
                                            <label htmlFor="name-list">Имя списка</label>
                                        </span>
                                </div>
                                <div className="overflow-hidden"
                                     // style={{height: '78%'}}
                                     style={{ height: 'calc(100vh - 210px)' }}
                                >
                                    {/*{*/}
                                    {/*    SkeletonProductsList*/}
                                    {/*}*/}
                                    {
                                        dataWL?.productsWishList.length
                                    }
                                    {
                                        products?.length
                                    }
                                    <DataTable editMode="row"
                                               dataKey="id"
                                               resizableColumns
                                               value={products} paginator rows={10} first={0}
                                               selection={selectedProducts}
                                               onSelectionChange={handleSelectionChange}
                                               onRowEditComplete={handleRowEditComplete}
                                               scrollable scrollHeight="flex" responsiveLayout="scroll"
                                               className={style.tableProducts} size="small">
                                        <Column selectionMode="multiple" headerStyle={{width: '.1rem'}}
                                                style={{flex: '0 0 2.5rem'}} exportable={false}/>
                                        <Column field="img" style={{flex: '0 0 5.8rem'}}
                                                body={imageBodyTemplate}/>
                                        <Column field="name" bodyStyle={{fontWeight: 500}} editor={nameEditor}
                                                header="Имя" sortable/>
                                        <Column field="description" header="Описание" editor={descriptionEditor}
                                                style={{flex: '0 0 20rem'}}/>
                                        <Column field="labels" header="Метки" body={labelBodyTemplate}
                                                editor={labelsEditor} style={{flex: '0 0 35rem'}}/>
                                        <Column rowEditor headerStyle={{width: '1rem'}} style={{flex: '0 0 7rem'}}
                                                bodyStyle={{textAlign: 'center'}}/>
                                    </DataTable>
                                </div>
                                <div className="flex align-items-center justify-content-between flex-column bottom-0">
                                    <Toolbar className="w-full p-2" left={leftToolbarTemplate} right={rightToolbarTemplate}/>
                                </div>
                            </div>
                            <ProductDialog visible={showDialog} onShow={handleAddProduct} onHide={() => {
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
