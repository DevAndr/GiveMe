import {ApolloCache, useMutation, useQuery} from "@apollo/client";
import {
    AuthData,
    IList, ITokens, ParamsAuthWithTwitch,
    ParamsProductsWIshList,
    ParamsRefreshToken,
    ParamsRemoveList,
    ParamsRemoveProducts,
    ParamsSignUpAuth, ParamsUpdateProduct,
    ParamsUpdateWishList, ResponseAuthWitch,
    ResponseList,
    ResponseListCurrentUser,
    ResponseProducts,
    ResponseRefreshToken,
    ResponseRemovedProducts,
    ResponseUpdateProduct,
    ResponseUpdateWishList,
    RsponseAuth
} from "./types";
import {
    AUTH_WITH_TWITCH,
    GET_LISTS_CURRENT_USER,
    GET_PRODUCTS_BY_UID_LIST,
    REFRESH_TOKEN,
    REMOVE_LIST, REMOVE_PRODUCTS,
    SIGN_UP, UPDATE_EDITOR_PRODUCT,
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

export const useGetTokens = () => useMutation<ResponseRefreshToken, {}>(REFRESH_TOKEN);

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

export const useUpdateEditorProducts = () => {
    const [updateProducts] = useMutation<ResponseUpdateProduct, ParamsUpdateProduct>(UPDATE_EDITOR_PRODUCT)

    return (uidWishList: string, product: any) => {

        console.log(uidWishList, product)

        return updateProducts({
            variables: {
                data: {uid: product.uid, uidWishList: product.uidWishList, labels: product.labels,
                    description: product.description, name: product.name}
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
                        productsWishList: data?.productsWishList?.map(p => {
                            if (p.uid.includes(product.uid)) {
                                return {...p, ...product}
                            }

                            return p
                        })
                    },
                });
            }
        })
    }
}

export const useAuthWithTwitch = () => useMutation<ResponseAuthWitch, ParamsAuthWithTwitch>(AUTH_WITH_TWITCH)

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

