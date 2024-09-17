'use client';

import React, {FC, useEffect, useRef, useState} from 'react';
import {Button} from 'primereact/button';
import {Splitter, SplitterPanel} from 'primereact/splitter';
import {
    GET_PRODUCTS_BY_UID_LIST,
    SUB_CREATED_LIST, SUB_REMOVED_LIST,
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
import './styles.scss';
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
import {confirmPopup, ConfirmPopup} from 'primereact/confirmpopup';
import {Toast} from 'primereact/toast';
import {Dialog} from 'primereact/dialog';
import {Toolbar} from 'primereact/toolbar';
import ProductTable from '@/components/grid/ProductTable';
import {useRouter} from 'next/navigation';
import {getCookieUID, getCookieUserName} from '@/actions';
import CreateListDialog from '@/components/dialogs/CreateListDialog';

interface EditWishListPageProps {

}

const EditWishListPage: FC<EditWishListPageProps> = () => {
    const uid = getCookieUID();
    const refUID = useRef<string>(getCookieUID());
    const router = useRouter();
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
            idWishList: currentWishList ? currentWishList?.id : ""
        },
        // pollInterval: 3000
    });

    const removeProducts = useRemoveProducts();
    const updateProduct = useUpdateEditorProducts();
    const [visible, setVisible] = useState<boolean>(false);
    const [showProductDialog, setShowProductDialog] = useState(false);
    const [showCreateListDialog, setShowCreateListDialog] = useState(false);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [selectedProducts, setSelectedProducts] = useState<any[]>([]);
    const refToast = useRef<null | any>(null);

    useEffect(() => {
        console.log('EditWishListPage', uid);
        if (refUID.current) {
            subscribeToMore<SubCreatedList, ParamsSubCreatedList>({
                document: SUB_CREATED_LIST, variables: {
                    idUser: refUID.current
                },
                updateQuery: (prev, {subscriptionData}) => {
                    if (!subscriptionData.data) return prev;

                    console.log('subscribeToMore', subscriptionData.data);

                    const newList = subscriptionData.data.listCreated;

                    return Object.assign({}, prev, {
                        wishListsCurrentUser: [...prev.wishListsCurrentUser, newList]
                    });
                }
            });
            //ws событие удаленного списка от сервера
            subscribeToMore<SubRemoveList, ParamsSubRemoveList>({
                document: SUB_REMOVED_LIST, variables: {
                    idUser: refUID.current
                },
                updateQuery: (prev, {subscriptionData: {data}}) => {
                    if (!data) return prev;

                    const listRemoved = data.listRemoved;

                    return Object.assign({}, prev, {
                        wishListsCurrentUser: prev.wishListsCurrentUser.filter(list => list.id !== listRemoved.id)
                    });
                }
            });
        }
    }, [refUID.current]);

    const handleAddProduct = () => {
        setShowProductDialog(true);
    };

    const accept = () => {
        refToast?.current.show({severity: 'info', summary: 'Удалено', detail: 'You have accepted', life: 3000});
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
    );

    const ItemWishListTemplate = (data: IList) => {
        return <WishListItem data={data} currentWishList={currentWishList} onSetCurrentWishList={(wishList) => {
            setCurrentWishList(wishList);
        }} confirm={confirm}/>;
    };

    const EmptyWishLists = (<div className="px-4 py-2 flex items-center justify-center">
        <i className="pi pi-exclamation-circle pr-2 text-primary-300"></i><label>Еще нет списка желаний</label>
    </div>);

    const hideDeleteProductDialog = () => {
        setShowDeleteDialog(false);
    };

    const handleDeleteSelectedProducts = async () => {
        const {errors} = await removeProducts(currentWishList?.id, selectedProducts.map(sp => sp.id));
        setShowDeleteDialog(false);
        setSelectedProducts([]);

        refToast.current.show({severity: 'success', summary: 'Готово', detail: 'Желания удалены!', life: 3000});

        if (errors)
            refToast.current.show({
                severity: 'error',
                summary: 'Внимание',
                detail: 'Не удалось удалить желания',
                life: 3000
            });
    };

    const deleteProductsDialogFooter = (
        <div className="flex gap-2 justify-end">
            <Button label="Нет" icon="pi pi-times" className="p-button-outlined p-button-sm"
                    onClick={hideDeleteProductDialog}/>
            <Button label="Да" icon="pi pi-check" className="p-button p-button-sm"
                    onClick={handleDeleteSelectedProducts}/>
        </div>
    );

    const handleShowDeleteDialog = () => {
        setShowDeleteDialog(true);
    };

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
        );
    };

    const handleViewWishList = async () => {
        const urlViewList = getLinkToWishList();
        console.log(urlViewList);
        await router.push(urlViewList);
    };

    const getLinkToWishList = (): string => {
        const {origin} = window.location;
        const urlViewList = `${origin}/wishlists/${currentWishList?.idUser}/${currentWishList?.id}`;
        return urlViewList;
    };

    const handleCopyUrl = async () => {
        const urlViewList = getLinkToWishList();
        await navigator.clipboard.writeText(urlViewList);
        refToast.current.show({severity: 'success', summary: 'Готово', detail: 'Скопировано', life: 3000});
    };

    const rightToolbarTemplate = () => {
        return (
            <div className="flex gap-2">
                <Button label="Копировать ссылку" icon="pi pi-clone p-button-sm"
                        className="p-button p-button-sm" onClick={handleCopyUrl}/>
                <Button label="Просмотр" icon="pi pi-eye p-button-sm"
                        className="p-button p-button-sm" onClick={handleViewWishList}/>
            </div>
        );
    };

    const handleSelectionChange = (e: any) => {
        if (e.type === 'checkbox' || e.type === 'all') {
            setSelectedProducts(e.value);
        }
    };

    function confirm(event: MouseEvent) {
        console.log(this);
        confirmPopup({
            target: event.currentTarget,
            message: 'Удалить список?',
            icon: 'pi pi-info-circle',
            acceptClassName: 'p-button-danger',
            className: 'confirmPopup',
            rejectLabel: "Нет",
            acceptLabel: "Да",
            accept: () => {
                this.accept();
                refToast?.current.show({severity: 'info', summary: 'Удалено', detail: this.data.name, life: 3000});
            },
            reject: () => {
                this.reject();
            }
        });
    }

    const hideCreateListDialog = () => {
        setShowCreateListDialog(false);
    }

    return (
        <div className="w-full">
            <div className="flex justify-between items-start flex-wrap">
                <h1>Списки желаний</h1>
            </div>
            <Splitter className="slider-splitter" layout="horizontal">
                <SplitterPanel size={30} minSize={10} className="list-panel">
                    {
                        loadingLists ?
                            SkeletonWishList
                            : dataWishLists?.wishListsCurrentUser &&
                            <DataScroller className="w-full" value={dataWishLists?.wishListsCurrentUser}
                                          itemTemplate={ItemWishListTemplate}
                                          emptyMessage={EmptyWishLists}
                                          rows={10} inline scrollHeight="500px"/>
                    }
                    {/*<AddWishlistForm/>*/}
                    <div className='m-2'>
                        <Button className="w-full" label="Добавить" icon="pi pi-plus" onClick={() => setShowCreateListDialog(true)}/>
                    </div>
                </SplitterPanel>
                <SplitterPanel size={70} minSize={60} className="details-list">
                    <div className="overflow-hidden">
                        {
                            loadingProductsWL ?
                                SkeletonProductsList :
                                <ProductTable selections={selectedProducts} value={dataWL?.productsWishList}
                                              onSelectionChange={handleSelectionChange}/>
                        }
                    </div>
                    <div className="flex align-items-center justify-content-between flex-column bottom-0">
                        {
                            currentWishList &&
                            <Toolbar className="action-bar" left={leftToolbarTemplate}
                                     right={rightToolbarTemplate}/>
                        }
                    </div>
                </SplitterPanel>
            </Splitter>
            <CreateListDialog visible={showCreateListDialog} onHide={hideCreateListDialog}/>
            <ProductDialog currentUIDWishList={currentWishList?.id} visible={showProductDialog}
                           onShow={handleAddProduct} onHide={() => {
                setShowProductDialog(false);
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