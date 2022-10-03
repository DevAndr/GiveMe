import {ApolloCache, useMutation, useQuery} from "@apollo/client";
import {
    AuthData,
    IList, ParamsProductsWIshList, ParamsRefreshToken,
    ParamsRemoveList, ParamsRemoveProducts,
    ParamsSignUpAuth, ParamsUpdateWishList,
    ResponseList,
    ResponseListCurrentUser, ResponseProducts, ResponseRefreshToken, ResponseRemovedProducts, ResponseUpdateWishList,
    RsponseAuth
} from "./types";
import {
    GET_LISTS_CURRENT_USER,
    GET_PRODUCTS_BY_UID_LIST,
    REFRESH_TOKEN,
    REMOVE_LIST, REMOVE_PRODUCTS,
    SIGN_UP,
    UPDATE_LIST
} from "./gqls";

export const useRemoveList = () => {
    const [removeList] = useMutation<ResponseList, ParamsRemoveList>(REMOVE_LIST);
    return (uid: string) => {

        return removeList({
            variables: {uid},
            update: async (store: ApolloCache<IList>) => {

                const data = await store.readQuery<ResponseListCurrentUser>({
                    query: GET_LISTS_CURRENT_USER,
                });

                store.writeQuery({
                    query: GET_LISTS_CURRENT_USER,
                    data: {
                        wishListsCurrentUser: data?.wishListsCurrentUser?.filter(
                            list => list.uid !== uid,
                        ),
                    },
                });
            },
        });
    }
}

export const useGetListsCurrentUser = () => useQuery<ResponseListCurrentUser>(GET_LISTS_CURRENT_USER);

export const useProductsWishList = (uidWishList: string) => {
        if (uidWishList)
            return useQuery<ResponseListCurrentUser>(GET_PRODUCTS_BY_UID_LIST, {variables: {uidWishList}})
}

export const useGetTokens = () => useMutation<ResponseRefreshToken, ParamsRefreshToken>(REFRESH_TOKEN);

export const useUpdateWishList = () => {
    const [updatedWishList] = useMutation<ParamsUpdateWishList, ResponseUpdateWishList>(UPDATE_LIST)

    return (params: ParamsUpdateWishList) => {
        return updatedWishList({
            variables: params,
            update: async (cache: ApolloCache<IList>, result, options) => {
                const data = await cache.readQuery<ResponseListCurrentUser>({
                    query: GET_LISTS_CURRENT_USER,
                });

                cache.writeQuery({
                    query: GET_LISTS_CURRENT_USER,
                    data: {
                        wishListsCurrentUser: data?.wishListsCurrentUser?.map(
                            list => {
                                if (list.uid === params.data.uid)
                                    return {...list, ...params.data}
                                return list
                            },
                        ),
                    },
                });
            }
        })
    }
}

export const useRemoveProducts = () => {
    const [removeProducts] = useMutation<ResponseRemovedProducts, ParamsRemoveProducts>(REMOVE_PRODUCTS)

    return (uidWishList: string, params: string[]) => {
        return removeProducts({
            variables: {
                products: params
            },
            update: async (cache: ApolloCache<any>, result, options) => {
                const data = await cache.readQuery<ResponseProducts, ParamsProductsWIshList>({
                    variables: {uidWishList},
                    query: GET_PRODUCTS_BY_UID_LIST,
                });

                await cache.writeQuery({
                    query: GET_PRODUCTS_BY_UID_LIST,
                    variables: {uidWishList},
                    data: {
                        productsWishList: data?.productsWishList?.filter(product => !params.includes(product.uid))
                    },
                });
            }
        })
    }
}

// export const useLogIn = () => {
//     const [logInAuth] = useMutation<RsponseAuth, ParamsSignUpAuth>(SIGN_UP);
//
//     return (credentials: AuthData) => logInAuth({
//         variables: {
//             ...credentials
//         }, update: async (store) => {
//
//         }
//     })
// }

