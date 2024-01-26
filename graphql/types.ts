import {ACCESS_TYPE} from "../../components/multi-chekbox";
import {MarketType} from "../../components/marketPlace";

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
    logIn: ITokens
}

export interface ParamsAuth {
    data: IAuthData
}

export interface ParamsSignUpAuth {
    data: ISignUpAuthData
}

export interface ICreateProductData {
    uidWishList: string
    name: string
    link: string
    description?: string
    labels: string[]
}

export type UpdateEditorProductType = Omit<ICreateProductData, "link"> & {
    uid: string
}

export interface IProduct extends ICreateProductData {
    img?: string
}

export interface ParamsCreateProduct {
    data: ICreateProductData & { marketPlace?: MarketType }
}

export interface RsponseProduct {
    data: IProduct
}

//---------------------

export interface ICreateListData {
    name: string
    description?: string
}

export interface IList {
    uid: string
    uidUser: string
    name: string
    description?: string
    access?: ACCESS_TYPE
    products?: []
}

export interface ParamsCreateList {
    data: ICreateListData
}

export interface ResponseList {
    data: IList
}

export interface ParamsRemoveList {
    uid: string
}

//----------------------------------------
export interface ResponseListCurrentUser {
    wishListsCurrentUser: IList[]
}

export interface SubCreatedList {
    listCreated: IList
}

export interface UIDUser {
    uidUser: string
}

export interface ParamsSubCreatedList extends UIDUser {
}

export interface SubRemoveList {
    list: IList
}

export interface ParamsSubRemoveList extends UIDUser {
}

export interface ParamsRefreshToken {
    data: {
        // uid: string,
        refreshToken: string
    }
}

export interface ParamsAuthWithTwitch {
    code: string
}

export interface ResponseAuthWitch {
    data: ITokens
}

export interface ResponseRefreshToken {
    refresh: ITokens
}

export interface ResponseUpdateWishList {

}

export interface ParamsUpdateWishList {
    data: Partial<IList>
}

export interface ResponseProducts {
    productsWishList: any[]
}

export interface ResponseRemovedProducts {
    removeProducts: any[]
}

export interface ParamsProductsWIshList {
    uidWishList: string
}

export interface ParamsRemoveProducts {
    products: string[]
}

export interface ResponseUpdateProduct {
    updateProduct: any
}

export interface ParamsUpdateProduct {
    data: UpdateEditorProductType
}

