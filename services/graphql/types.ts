export interface ITokens {
    access_token: string;
    refresh_token: string;
}

export interface IAuthData {
    email: string;
    password: string;
}

export interface ISignUpAuthData extends IAuthData{
    name: string;
}

export interface AuthData {
    email: string;
    password: string;
}

export interface RsponseAuth {
   data: {
       logIn: ITokens
   }
}

export interface ParamsAuth {
    data: IAuthData
}

export interface ParamsSignUpAuth {
    data: ISignUpAuthData
}

export interface ICreateProductData {
    name: string
    link: string
    description?: string
    labels: string[]
}

export interface IProduct extends ICreateProductData{
    img?: string
}

export interface ParamsCreateProduct {
    data: ICreateProductData
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

export interface ParamsSubCreatedList extends UIDUser {}

export interface SubRemoveList {
    list: IList
}

export interface ParamsSubRemoveList extends UIDUser {}
