import React, {FC, useEffect, useState} from "react";
import style from "../../styles/Lists.module.scss";
import {DataView, DataViewLayoutOptions} from "primereact/dataview";
import SectionLikes from "../section-likes";
import {BiRuble} from "react-icons/bi";
import {Button} from "primereact/button";
import {IoIosGift} from "react-icons/io";
import {addProductToBasket} from "../../redux/reducers/basketshop.slice";
import {Dropdown} from "primereact/dropdown";
import {ProductService} from "../../services/product.service";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {Chip} from "primereact/chip";
import {Tooltip} from "primereact/tooltip";

interface IWishList {
    isOwner?: boolean
}

const WishList: FC<IWishList> = ({isOwner}) => {
    const dispatch = useAppDispatch()

    const [products, setProducts] = useState(null);
    const [layout, setLayout] = useState('grid');
    const [sortKey, setSortKey] = useState(null);
    const [sortOrder, setSortOrder] = useState(null);
    const [sortField, setSortField] = useState(null);
    const sortOptions = [
        {label: 'По цене от макс', value: '!price'},
        {label: 'По цене от мин', value: 'price'}
    ];

    const productService = new ProductService();

    useEffect(() => {
        productService.getProductsSmall().then(data => setProducts(data));
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const onSortChange = (event) => {
        const value = event.value;

        if (value.indexOf('!') === 0) {
            setSortOrder(-1);
            setSortField(value.substring(1, value.length));
            setSortKey(value);
        } else {
            setSortOrder(1);
            setSortField(value);
            setSortKey(value);
        }
    }

    const renderListItem = (data) => {
        return (
            <div className="col-12">
                <div className={style.productListItem}>
                    <img src={`images/product/${data.image}`}
                         onError={(e) =>
                             e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'}
                         alt={data.name}/>
                    <div className={style.productListDetail}>
                        <div className={style.productName}>{data.name}</div>
                        <div className={style.productDescription}>{data.description}</div>
                        {/*<Rating value={data.rating} readOnly cancel={false}/>*/}
                        <div className="flex align-items-center mt-1">
                            <i className="pi pi-tag product-category-icon"/>
                            <span className={style.productCategory}>{data.category}</span>
                        </div>
                    </div>
                    <div className="flex w-full px-4">
                        <SectionLikes/>
                    </div>
                    <div className={style.productListAction}>
                        <span className={style.productPrice}>{data.price}<BiRuble/></span>
                        <Button icon={<IoIosGift/>} label="Подарить" iconPos="right"
                                disabled={data.inventoryStatus === 'OUTOFSTOCK'}/>
                        <span className={`product-badge status-${data.inventoryStatus.toLowerCase()}`}>{
                            data.inventoryStatus === 'OUTOFSTOCK' ? 'подарил Пися в попе' : data.inventoryStatus
                        }</span>
                    </div>
                </div>
            </div>
        );
    }

    const renderGridItem = (data) => {
        const checkDone = data.inventoryStatus === 'OUTOFSTOCK'
        let styleStatus: any = "", styleCard: any = ""
        styleStatus = checkDone && style.done
        styleCard = checkDone && style.done

        return (
            <div className="col-12 md:col-6 lg:col-4">
                <div className={`${style.productGridItem} ${styleCard} card`}>
                    <div className={style.productGridItemTop}>
                        <div className="flex align-items-center">
                            <i className="pi pi-tag product-category-icon"/>
                            <span className={style.productCategory}>{data.category}</span>
                        </div>
                        <span
                            className={`${style.statusProduct} ${styleStatus}`}>{
                            data.inventoryStatus === 'OUTOFSTOCK' ? 'Подарено' : data.inventoryStatus
                        }</span>
                    </div>
                    <div className={style.productGridItemContent}>
                        <img src={`images/product/${data.image}`}
                             onError={(e) =>
                                 e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'}
                             alt={data.name}/>
                        <div className={style.productName}>{data.name}</div>
                        <div className={style.productDescription}>{data.description}</div>
                        <SectionLikes/>
                    </div>
                    <div className={style.productGridItemBottom}>
                        <span className={style.productPrice}>{data.price}<BiRuble/></span>
                        {
                            data.inventoryStatus === 'OUTOFSTOCK' ?
                                <Chip id="receiver" label={'Подарил Орку'} icon={<IoIosGift/>} className="m-0 text-xs"/> :
                                <Button icon={<IoIosGift/>} label="Подарить" iconPos="right"
                                        disabled={data.inventoryStatus === 'OUTOFSTOCK'} onClick={() => {
                                    console.log(data)
                                    dispatch(addProductToBasket(data))
                                }}/>
                        }
                    </div>
                </div>
            </div>
        );
    }

    const itemTemplate = (product, layout) => {
        if (!product) {
            return;
        }

        if (layout === 'list')
            return renderListItem(product);
        else if (layout === 'grid')
            return renderGridItem(product);
    }

    const renderHeader = () => {
        return (
            <div className="flex justify-content-between">
                <div className="" style={{textAlign: 'left'}}>
                    <Dropdown options={sortOptions} value={sortKey} optionLabel="label"
                              placeholder="Сортировка по статусу"
                              onChange={onSortChange} className={style.dropDownSmall}/>
                    {
                        isOwner &&
                        <Button label="Ссылка на лист" className="ml-4 p-button-sm" icon="pi pi-copy" iconPos="left"/>
                    }
                </div>
                {/*<div className="align-self-center">*/}
                {/*    <h3 className="m-0 text-color">Мой список желаний 1 <span*/}
                {/*        className="text-2xl ml-2 text-primary-500">{"DDdsdsdf"}</span></h3>*/}
                {/*</div>*/}
                <div className="" style={{textAlign: 'right'}}>
                    <DataViewLayoutOptions layout={layout} onChange={(e) => setLayout(e.value)}/>
                </div>
            </div>
        );
    }

    const header = renderHeader();

    return (
        <div className={style.dataviewProducts}>
            <div className="card justify-content-center flex">
                <DataView value={products} layout={layout} header={header} className={style.dataViewListProducts}
                          itemTemplate={itemTemplate} paginator rows={9}
                          sortOrder={sortOrder} sortField={sortField}/>
                <Tooltip target="#receiver" position="bottom">
                    <div className="p-0 m-0 ">
                        <p className="text-xs">
                            Комментарий:
                        </p>
                        На здоровье ds d fg vtgkk vretgvm
                    </div>
                </Tooltip>
            </div>
        </div>
    )
}

export default WishList
