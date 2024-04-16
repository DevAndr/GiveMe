'use client';

import React, {FC, useEffect, useRef, useState} from 'react';
import {Button} from 'primereact/button';
import {Splitter, SplitterPanel} from 'primereact/splitter';
import {
    GET_PRODUCTS_BY_UID_LIST,
    SUB_CREATED_LIST, SUB_LIST,
    useGetListsCurrentUser,
    useRemoveProducts,
    useUpdateEditorProducts
} from '@/graphql';
import {
    IList,
    ParamsProductsWIshList,
    ParamsSubCreatedList, ParamsSubRemoveList,
    ResponseProducts,
    SubCreatedList,
    SubRemoveList
} from '@/graphql/types';
import {useQuery} from '@apollo/client';
import './styles.scss'
import {Skeleton} from 'primereact/skeleton';
import {DataScroller} from 'primereact/datascroller';
import WishListItem from '@/components/wishlist/WishListItem';
import AddWishlistForm from '@/components/form/AddWishlistForm';
import {Column} from 'primereact/column';
import {DataTable} from 'primereact/datatable';
import {InputText} from 'primereact/inputtext';
import {InputTextarea} from 'primereact/inputtextarea';
import MarketPlace from '@/components/market/MarketPlace';
import ProductDialog from '@/components/dialogs/ProductDialog';
import {ConfirmPopup} from 'primereact/confirmpopup';
import {Toast} from 'primereact/toast';
import {Dialog} from 'primereact/dialog';
import {Toolbar} from 'primereact/toolbar';
import ProductTable from '@/components/grid/ProductTable';

interface EditWishListPageProps {

}

const EditWishListPage: FC<EditWishListPageProps> = () => {
    const [currentWishList, setCurrentWishList] = useState<IList | null>(null);
    const {
        subscribeToMore,
        loading: loadingLists,
        error: errorLists,
        data: dataWishLists
    } = useGetListsCurrentUser();
    const {
        loading: loadingProductsWL,
        error: errorWL,
        data: dataWL,
        // refetch: refetchProducts
    } = useQuery<ResponseProducts, ParamsProductsWIshList>(GET_PRODUCTS_BY_UID_LIST, {
        variables: {
            uidWishList: currentWishList ? currentWishList?.uid : ""
        },
        pollInterval: 3000
    });

    const removeProducts = useRemoveProducts()
    const updateProduct = useUpdateEditorProducts()
    const [visible, setVisible] = useState<boolean>(false);
    const [showDialog, setShowDialog] = useState(false)
    const [showDeleteDialog, setShowDeleteDialog] = useState(false)
    const [selectedProducts, setSelectedProducts] = useState<any[]>([])
    const refToast = useRef<null | any>(null);

    useEffect(() => {
        subscribeToMore<SubCreatedList, ParamsSubCreatedList>({
            document: SUB_CREATED_LIST, variables: {
                uidUser: '0857ceb4-a54b-4e22-a0cc-e9b548a59783'
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
                uidUser: '0857ceb4-a54b-4e22-a0cc-e9b548a59783'
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

    const handleSelectionChange = (e: any) => {
        if (e.type === 'checkbox' || e.type === 'all') {
            setSelectedProducts(e.value)
        }
    }

    const handleRowEditComplete = async (e) => {
        let {newData, index} = e
        await updateProduct(newData.uidWishList, newData)

        // refetchProducts({uidWishList: currentWishList.uid})
    }

    const handleAddProduct = () => {
        setShowDialog(true)
    }

    const accept = () => {
        refToast?.current.show({severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000});
    };

    const reject = () => {
        refToast?.current.show({severity: 'warn', summary: 'Rejected', detail: 'You have rejected', life: 3000});
    };

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

    const ItemWishListTemplate = (data: IList) => {
        return <WishListItem data={data} onSetCurrentWishList={(wishList) => {
            setCurrentWishList(wishList)
        }} confirm={confirm}/>
    }

    const EmptyWishLists = (<div className='px-4 py-2 flex items-center justify-center'>
        <i className="pi pi-exclamation-circle pr-2 text-primary-300"></i><label>Еще нет списка желаний</label>
    </div>)

    const imageBodyTemplate = (rowData: any) => {
        return <img src={`${rowData.img}`}
                    onError={(e: any) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'}
                    alt={rowData.image} className="w-4rem"/>
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

    const marketTypeTemplate = (rowData: any) => {
        return <MarketPlace type={rowData.marketPlace}/>
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

    const handleShowDeleteDialog = () => {
        setShowDeleteDialog(true)
    }

    const leftToolbarTemplate = () => {
        return (
            <>
                <Button label="Добавить" icon="pi pi-plus" className="p-button mr-2 p-button-sm"
                        onClick={handleAddProduct}/>
                {
                    selectedProducts.length > 0 &&
                    <Button label={`Удалить ${selectedProducts.length > 0 ? `(${selectedProducts.length})` : ''}`}
                            icon="pi pi-trash" className="p-button-danger p-button-sm"
                            onClick={handleShowDeleteDialog}/>
                }
            </>
        )
    }

    const handleViewWishList = () => {
        const urlViewList = getLinkToWishList()
        console.log(urlViewList)
    }

    const getLinkToWishList = (): string => {
        const urlViewList = `/viewList/${currentWishList?.uidUser}/${currentWishList?.uid}`
        return urlViewList
    }

    const handleCopyUrl = () => {
        const urlViewList = getLinkToWishList()
        console.log(urlViewList)
        refToast.current.show({severity: 'success', summary: 'Готово', detail: 'Скопировано', life: 3000});
    }

    const rightToolbarTemplate = () => {
        return (
            <div className="flex gap-2">
                <Button label="Копировать ссылку" icon="pi pi-clone p-button-sm"
                        className="p-button p-button-sm" onClick={handleCopyUrl}/>
                <Button label="Просмотр" icon="pi pi-eye p-button-sm"
                        className="p-button p-button-sm" onClick={handleViewWishList}/>
            </div>
        )
    }

    return (
        <div className="w-full">
            <div className="flex justify-between items-start flex-wrap">
                <h1>Списки желаний</h1>
            </div>
            <Splitter className='slider-splitter' layout='horizontal'>
                <SplitterPanel size={30} minSize={10} className='list-panel'>
                    {
                        loadingLists ?
                            SkeletonWishList
                            : dataWishLists?.wishListsCurrentUser &&
                            <DataScroller className="w-full" value={dataWishLists?.wishListsCurrentUser}
                                          itemTemplate={ItemWishListTemplate}
                                          emptyMessage={EmptyWishLists}
                                          rows={10} inline scrollHeight="500px"/>
                    }
                    <AddWishlistForm/>
                </SplitterPanel>
                <SplitterPanel size={70} minSize={60} className="details-list">
                    <h4>{currentWishList?.name}</h4>
                    <div className="overflow-hidden">
                        {
                            loadingProductsWL ?
                                SkeletonProductsList :
                                <ProductTable selections={selectedProducts} value={dataWL?.productsWishList}/>
                        }
                    </div>
                    <div className="flex align-items-center justify-content-between flex-column bottom-0">
                        <Toolbar className="action-bar" left={leftToolbarTemplate}
                                 right={rightToolbarTemplate}/>
                    </div>
                </SplitterPanel>
            </Splitter>
            <ProductDialog currentUIDWishList={currentWishList?.uid} visible={showDialog}
                           onShow={handleAddProduct} onHide={() => {
                setShowDialog(false);
            }}/>
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
            <Toast ref={refToast} position="bottom-right"/>
        </div>
    );
};

export default EditWishListPage;