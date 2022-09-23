import {ApolloCache, useMutation, useQuery} from "@apollo/client";
import {IList, ParamsRemoveList, ResponseList, ResponseListCurrentUser} from "./types";
import {GET_LISTS_CURRENT_USER, REMOVE_LIST} from "./gqls";

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
