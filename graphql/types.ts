import {MarketType} from "../../components/marketPlace";

export enum ACCESS_TYPE {
    PUBLIC = "PUBLIC",
    PRIVATE = "PRIVATE"
}

export interface ITokens {
    access_token: string;
    refresh_token: string;
}

export interface IAuthData {
    email: string;
    password: string;
}

export interface ISignUpAuthData extends IAuthData {
    name: string;
}

export interface AuthData {
    email: string;
    password: string;
}

export interface RsponseAuth {
    logIn: ITokens;
}

export interface ParamsAuth {
    data: IAuthData;
}

export interface ParamsSignUpAuth {
    data: ISignUpAuthData;
}

export interface ICreateProductData {
    idWishList: string;
    name: string;
    link: string;
    description?: string;
    labels: string[];
}

export type UpdateEditorProductType = Omit<ICreateProductData, "link"> & {
    id: string
}

export interface IProduct extends ICreateProductData {
    img?: string;
}

export interface ParamsCreateProduct {
    data: ICreateProductData & { marketPlace?: MarketType };
}

export interface RsponseProduct {
    data: IProduct;
}

//---------------------

export interface ICreateListData {
    name: string;
    description?: string;
}

export interface IList {
    id: string;
    idUser: string;
    name: string;
    description?: string;
    access?: ACCESS_TYPE;
    products?: Product[];
}

export interface ParamsCreateList {
    data: ICreateListData;
}

export interface ResponseList {
    data: IList;
}

export interface ParamsRemoveList {
    id: string;
}

//----------------------------------------
export interface ResponseListCurrentUser {
    wishListsCurrentUser: IList[];
}

export interface SubCreatedList {
    listCreated: IList;
}

export interface UIDUser {
    idUser: string;
}

export interface ParamsSubCreatedList extends UIDUser {
}

export interface SubRemoveList {
    listRemoved: IList;
}

export interface ParamsSubRemoveList extends UIDUser {
}

export interface ParamsRefreshToken {
    data: {
        refreshToken: string
    };
}

export interface ParamsAuthWithTwitch {
    code: string;
}

export interface ResponseAuthWitch {
    data: ITokens;
}

export interface ResponseRefreshToken {
    refresh: ITokens;
}

export interface ResponseUpdateWishList {

}

export interface ParamsUpdateWishList {
    data: Partial<IList>;
}

export type MarketType = 'OZON' | 'WB'

enum StatusOrder {
    OPEN = 'OPEN',
    ACTIVE = 'ACTIVE',
    PROCESSING = 'PROCESSING',
    COMPLETED = 'COMPLETED',
    PENDING = 'PENDING',
    PAYED = 'PAYED'
}

enum StatusProduct {
    VALIDATION = 'VALIDATION',
    ACTIVE = 'ACTIVE',
    COMPLETED = 'COMPLETED'
}

export type Product = {
    name: string;
    description: string;
    price: number;
    royalties: number;
    delivery: number;
    marketPlace: MarketType;
    link: string;
    img: string;
    status: StatusProduct;
    idWishList: string;
    id: string;
    labels: any[];
    idSender?: string;
    descriptionReceiver?: string;
    likes: number;
    disLikes: number;
}


export type Order = {
    id: string
    createAt: Date
    updateAt: Date
    name: string
    description: string
    price: number
    status: StatusOrder
    products: Product[]
    transactionId: string
}

type Sender = {
    id: string
    email: string
    nickname: string
}

export interface User {
    id: string;
    email: string;
    name: string;
}

export interface ResponseProducts {
    productsWishList: Product[];
}

export interface ResponseRemovedProducts {
    removeProducts: any[];
}

export interface ParamsProductsWIshList {
    idWishList: string;
}

export interface ParamsRemoveProducts {
    products: string[];
}

export interface ResponseUpdateProduct {
    updateProduct: any;
}

export interface ParamsUpdateProduct {
    data: UpdateEditorProductType;
}

export type ResponseGetUser = {
    user: User;
}

type UpdateOrder = {
    id: string
    name: string
    description: string
    productIds: string[]
}

export interface ParamsPathOrder {
    data: Partial<UpdateOrder>;
}

export type ResponsePathOrder = {
    pathOrder: Order;
}

export type ResponseCreateOrGetSender = {
    getOrCreateSender: Sender
}