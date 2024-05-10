import {gql} from '@apollo/client';

const GET_USERS = gql`
    query Users {
        users {
            id
            name
            email
        }
    }`;

const IS_AUTH = gql`
    query CheckAuth {
        checkAuth {
            isAuth
        }
    }`;

const CURRENT_USER = gql`
    query CurrentUser {
        currentUser {
            id
            name
            email
            role
            createAt
            updateAt
        }
    }`;

const LOG_IN = gql`
    mutation LogIn($data: InputLogIn) {
        logIn(data: $data) {
            access_token
            refresh_token
        }
    }`;

const SIGN_UP = gql`
    mutation SignUp($data: InputSignUp) {
        signUp(data: $data) {
            access_token
            refresh_token
        }
    }`;

const CREATE_PRODUCT_TO_LIST = gql`
    mutation AddToList($data: InputAddProductToList) {
        addToList(data: $data) {
            name
            description
            link
            labels
        }
    }`;

const CREATE_LIST = gql`
    mutation CreateList($data: InputCreateList) {
        createList(data: $data) {
            id
            idUser
            name
            description
        }
    }`;

const REMOVE_LIST = gql`
    mutation RemoveList($id: String) {
        removeList(id: $id) {
            id
            idUser
            name
            description
        }
    }`;

const REFRESH_TOKEN = gql`
    mutation Refresh {
        refresh {
            access_token
            refresh_token
        }
    }`;

const GET_USER_BY_UID = gql`
    query User($id: String!) {
        user(id: $id) {
            id
            email
            name
        }
    }`;

const GET_PRODUCTS_BY_UID_LIST = gql`
    query ProductsWishList($idWishList: String!) {
        productsWishList(idWishList: $idWishList) {
            name
            description
            price
            royalties
            delivery
            marketPlace
            link
            img
            status
            idWishList
            id
            labels
            idSender
            descriptionReceiver
            likes
            disLikes
        }
    }`;

const GET_LIST_BY_ID_FOR_USER = gql`
    query WishLisByIdForUser($idUser: String, $idList: String) {
        wishLisByIdForUser(idUser: $idUser, idList: $idList) {
            id
            name
            description
            idUser
        }
    }`;

const GET_LISTS_CURRENT_USER = gql`
    query WishListsCurrentUser {
        wishListsCurrentUser {
            id
            name
            description
            idUser
            access
            products {
                status
            }
        }
    }`;

const SUB_CREATED_LIST = gql`
    subscription ListCreated($idUser: String!) {
        listCreated(idUser: $idUser) {
            id
            idUser
            name
            description
        }
    }`;

const SUB_REMOVED_LIST = gql`
    subscription ListRemoved($idUser: String!) {
        listRemoved(idUser: $idUser) {
            id
            name
            description
            idUser
            access
            user {
                id
            }
            products {
                id
            }
        }
    }`;

const UPDATE_LIST = gql`
    mutation UpdateList($data: InputUpdateList) {
        updateList(data: $data) {
            id
            name
            description
            idUser
            access
        }
    }
`

const UPDATE_EDITOR_PRODUCT = gql`
    mutation UpdateProduct($data: InputUpdateEditorProduct) {
        updateProduct(data: $data) {
            id
            idWishList
            name
            description
            labels
        }
    }
`

const REMOVE_PRODUCTS = gql`
    mutation RemoveProducts($products: [String]!) {
        removeProducts(products: $products) {
            id
            idWishList
        }
    }
`

const AUTH_WITH_TWITCH = gql`
    mutation Twitch($code: String!) {
        twitch(code: $code) {
            access_token
            refresh_token
        }
    }
`

const PATH_ORDER = gql`
    mutation PathOrder($data: UpdateInput!) {
        pathOrder(data: $data) {
            id
            name
            description
            price
            status
            products {
                id
                name
            }
        }
    }`

const GET_ORDER_BY_ID = gql`
    query GetOrder($getOrderId: String!) {
        getOrder(id: $getOrderId) {
            id
            name
            description
            price
            status
            products  
        }
    }`

const GET_OR_CREATE_SENDER = gql`
    query GetOrCreateSender {
        getOrCreateSender {
            id 
            email
            nickname 
        }
    }
    `

export default {
    Mutation: {
        updateAuthData: (_, {access_token}, {cache}) => {
            const query = gql`
                query GetCurrentAuthData {
                    currentAuthData @client {
                        access_token
                    }
                }
            `;
            const previous = cache.readQuery({query});
            const data = {
                access_token
            };
            cache.writeQuery({query, data});
            return null;
        }
    }
};

export {
    GET_ORDER_BY_ID,
    PATH_ORDER,
    GET_USERS,
    LOG_IN,
    AUTH_WITH_TWITCH,
    SIGN_UP,
    IS_AUTH,
    CURRENT_USER,
    GET_USER_BY_UID,
    GET_LIST_BY_ID_FOR_USER,
    CREATE_PRODUCT_TO_LIST,
    CREATE_LIST,
    GET_LISTS_CURRENT_USER,
    SUB_CREATED_LIST,
    REMOVE_LIST,
    SUB_REMOVED_LIST,
    UPDATE_LIST,
    GET_PRODUCTS_BY_UID_LIST,
    REFRESH_TOKEN,
    REMOVE_PRODUCTS,
    UPDATE_EDITOR_PRODUCT,
    GET_OR_CREATE_SENDER
}