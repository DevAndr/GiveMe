import {NextPage} from "next";
import MainLayout from "../components/layouts/MainLayout";
import React, {useEffect, useState} from "react";
import {ListBox, ListBoxItemTemplateType} from 'primereact/listbox';
import style from "../styles/payment.module.scss";
import {ProductService} from "../services/product.service";
import {Divider} from "primereact/divider";
import {BiRuble} from "react-icons/bi";
import {Button} from "primereact/button";

const Payment: NextPage = () => {
    const [products, setProducts] = useState([]);
    const productService = new ProductService();

    useEffect(() => {
        productService.getProducts().then(data => setProducts(data));
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const Checkout = () => {
        return <div className={style.checkout}>
            <svg width="210px" viewBox="0 0 210 5" xmlns="http://www.w3.org/2000/svg">
                <path d="M0,0 210,0" fill="none" stroke="#e2e3de" stroke-dasharray="3 3"
                      stroke-width="10"/>
            </svg>

            <div className={style.info}>
                <span>Магазин "Рога и Капыта"</span>
                <span>Юридический адресс: Неизвестный край, г.Чепухово 34</span>
            </div>
            <h4>Фискальный чек</h4>
            <ul>
                <li><span>Колбаса</span><span className={style.price}>600</span></li>
                <li><span>Сыр</span><span className={style.price}>560</span></li>
                <li><span>Хлеб</span><span className={style.price}>80</span></li>
                <li><span>Томаты</span><span className={style.price}>100</span></li>
                <li><span>Каша Боярин</span><span className={style.price}>80</span></li>
                <li><span>Сухой корм</span><span className={style.price}>40</span></li>
                <li><span>Макароны</span><span className={style.price}>100</span></li>
                <li><span>Стиральный порошок</span><span className={style.price}>120</span></li>
                <li><span>Томатная паста</span><span className={style.price}>50</span></li>
                <li><span>Туалетная бумага</span><span className={style.price}>20</span></li>
            </ul>

            <p className="res">Какая то сумма</p>
            <div className={style.footer}>
                <svg width="210px" viewBox="0 0 210 5" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0,0 210,0" fill="none" stroke="#e2e3de" stroke-dasharray="3 3"
                          stroke-width="10"/>
                </svg>
            </div>
        </div>
    }

    const templateItemList: ListBoxItemTemplateType = (option) => {
        return <>
            <div className="col-12 align-self-center align-content-center align-items-center p-0">
                <div className="flex justify-content-between">
                    <img width={60} height={60} src={`images/product/${option.image}`}
                         onError={(e) =>
                             e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'}
                         alt={option.name}/>
                    <div className="flex-column flex ml-2 flex-auto">
                        <div className="font-medium text-lg mb-1">{option.name}</div>
                        <div className="">{option.description}</div>
                    </div>
                    <div className="flex flex-column justify-content-between">
                        <span className="font-medium text-lg">{option.price}<BiRuble/></span>
                    </div>
                </div>
            </div>
            <Divider type="dashed" className="m-0"/>
        </>
    }

    return (
        <MainLayout isHideFooter={true} isHideHeader={true} isHideMenu={true}>
            <div className="h-screen">
                <div className="ml-4 mt-4">
                    <Button icon="pi pi-chevron-left" className="p-button-rounded p-button-text p-button-plain"
                            aria-label="Back" label="Назад"/>
                </div>
                <div className="px-4 py-5 md:px-6 lg:px-8 lg:w-6 md:mx-aut absolute" style={{top: "25%", left: "25%"}}>
                    <h1 className="mt-0">Оплатить подарки для <span className="text-6xl ml-2 text-primary-500">Аыы</span></h1>
                    <div className={`bg-white shadow-2 ${style.cardPayment}`} style={{borderRadius: 6}}>
                        <div className="p-fluid grid formgrid">
                            <div className="field col-12 md:col-6 p-4">
                                <ListBox optionLabel="name" options={products} itemTemplate={templateItemList}
                                         listStyle={{maxHeight: '250px'}} listClassName={style.scrollBar}/>
                                <div className="flex flex-column mt-2 ml-2">
                                    <div className="text-base">
                                        <span className="font-normal">Подарки: </span><span
                                        className="font-normal">4680 <BiRuble/></span>
                                    </div>
                                    <div className="text-base">
                                        <span className="font-normal">Доставка: </span><span
                                        className="font-normal">99 <BiRuble/></span>
                                    </div>
                                    <Divider className="m-0 p-0 my-2"/>
                                    <div className="text-xl">
                                        <span className="font-normal">Всего: </span><span
                                        className="font-medium">4769 <BiRuble/></span>
                                    </div>
                                </div>
                            </div>
                            <div className="field col-12 md:col-6 bg-primary border-round-right m-0 p-0">
                                <div className="card justify-content-between flex flex-column">
                                    <label htmlFor="basic">Date Format</label>
                                    <form name="TinkoffPayForm" onSubmit="pay(this); return false;">
                                        <input className="tinkoffPayRow" type="hidden" name="terminalkey"
                                               value="TinkoffBankTest"/>
                                        <input className="tinkoffPayRow" type="hidden" name="frame" value="true"/>
                                        <input className="tinkoffPayRow" type="hidden" name="language"
                                               value="ru"/>
                                        <input className="tinkoffPayRow" type="text"
                                               placeholder="Сумма заказа" name="amount" required/>
                                        <input className="tinkoffPayRow" type="text"
                                               placeholder="Номер заказа" name="order"/>
                                        <input className="tinkoffPayRow" type="text"
                                               placeholder="Описание заказа" name="description"/>
                                        <input className="tinkoffPayRow" type="text"
                                               placeholder="ФИО плательщика" name="name"/>
                                        <input className="tinkoffPayRow" type="text"
                                               placeholder="E-mail" name="email"/>
                                        <input className="tinkoffPayRow" type="text"
                                               placeholder="Контактный телефон"
                                               name="phone"/>

                                        <Button className="p-button-raised p-button-secondary p-button-text bg-white my-4"
                                                type="submit" label="Оплатить"/>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    )
}

export default Payment
