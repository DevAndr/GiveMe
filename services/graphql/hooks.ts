import {ApolloCache, useMutation, useQuery} from "@apollo/client";
import {
    AuthData,
    IList, ParamsRefreshToken,
    ParamsRemoveList,
    ParamsSignUpAuth,
    ResponseList,
    ResponseListCurrentUser, ResponseRefreshToken,
    RsponseAuth
} from "./types";
import {GET_LISTS_CURRENT_USER, REFRESH_TOKEN, REMOVE_LIST, SIGN_UP} from "./gqls";

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

export const useGetTokens = () => useMutation<ResponseRefreshToken, ParamsRefreshToken>(REFRESH_TOKEN);

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

