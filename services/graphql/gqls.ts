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

const GET_USER_BY_UID = gql`
    query User($uid: String!) {
        user(uid: $uid) {
            uid
            email
            name
        }
    }`;

const GET_LISTBY_ID_FOR_USER = gql`
    query WishLisByIdForUser($uidUser: String, $uidList: String) {
        wishLisByIdForUser(uidUser: $uidUser, uidList: $uidList) {
            uid
            name
            description
            uidUser
        }
    }`;

export {
    GET_USERS,
    LOG_IN,
    IS_AUTH,
    CURRENT_USER,
    GET_USER_BY_UID,
    GET_LISTBY_ID_FOR_USER
}

// export const getCurrentCredential = graphql(CURRENT_CRIDENTIAL, {
//     name: 'getCurrentCredential', options: {
//         fetchPolicy: 'cache-only'
//     }
// });
