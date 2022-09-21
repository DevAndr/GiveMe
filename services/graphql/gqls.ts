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


const GET_USER_BY_UID = gql`
    query User($uid: String!) {
        user(uid: $uid) {
            uid
            email
            name
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
    SUB_LIST
}

// export const getCurrentCredential = graphql(CURRENT_CRIDENTIAL, {
//     name: 'getCurrentCredential', options: {
//         fetchPolicy: 'cache-only'
//     }
// });
