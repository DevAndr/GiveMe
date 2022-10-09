import {gql} from '@apollo/client';

const GET_USERS = gql`
    query Users {
        users {
            uid
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
            uid
            email
            name
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
            uid
            uidUser
            name
            description
        }
    }`;

const REMOVE_LIST = gql`
    mutation RemoveList($uid: String) {
        removeList(uid: $uid) {
            uid
            uidUser
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
    query User($uid: String!) {
        user(uid: $uid) {
            uid
            email
            name
        }
    }`;

const GET_PRODUCTS_BY_UID_LIST = gql`
    query ProductsWishList($uidWishList: String!) {
        productsWishList(uidWishList: $uidWishList) {
            name
            description
            price
            royalties
            delivery
            marketPlace
            link
            img
            status
            uidWishList
            uid
            labels
            uidReceiver
            descriptionReceiver
            likes
            disLikes
        }
    }`;

const GET_LIST_BY_ID_FOR_USER = gql`
    query WishLisByIdForUser($uidUser: String, $uidList: String) {
        wishLisByIdForUser(uidUser: $uidUser, uidList: $uidList) {
            uid
            name
            description
            uidUser
        }
    }`;

const GET_LISTS_CURRENT_USER = gql`
    query WishListsCurrentUser {
        wishListsCurrentUser {
            uid
            name
            description
            uidUser
            access
        }
    }`;

const SUB_CREATED_LIST = gql`
    subscription Subscription($uidUser: String!) {
        listCreated(uidUser: $uidUser) {
            uid
            uidUser
            name
            description
        }
    }`;

const SUB_LIST = gql`
    subscription Subscription($uidUser: String!) {
        list(uidUser: $uidUser) {
            uid
            uidUser
            name
            description
        }
    }`;

const UPDATE_LIST = gql`
    mutation UpdateList($data: InputUpdateList) {
        updateList(data: $data) {
            uid
            name
            description
            uidUser
            access
        }
    }
`

const UPDATE_EDITOR_PRODUCT = gql`
    mutation UpdateProduct($data: InputUpdateEditorProduct) {
        updateProduct(data: $data) {
            uid
            uidWishList
            name
            description
            labels
        }
    }
`

const REMOVE_PRODUCTS = gql`
    mutation RemoveProducts($products: [String]!) {
        removeProducts(products: $products) {
            uid
            uidWishList
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
    GET_USERS,
    LOG_IN,
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
    SUB_LIST,
    UPDATE_LIST,
    GET_PRODUCTS_BY_UID_LIST,
    REFRESH_TOKEN,
    REMOVE_PRODUCTS,
    UPDATE_EDITOR_PRODUCT
}

// export const getCurrentCredential = graphql(CURRENT_CRIDENTIAL, {
//     name: 'getCurrentCredential', options: {
//         fetchPolicy: 'cache-only'
//     }
// });
