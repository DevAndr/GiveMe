import {useMutation} from "@apollo/client";
import {ParamsRemoveList, ResponseList} from "./types";
import {GET_LISTS_CURRENT_USER, REMOVE_LIST} from "./gqls";

export const useRemoveList = () => {
    const [removeList] = useMutation<ResponseList, ParamsRemoveList>(REMOVE_LIST);
    return uid => {

        return removeList({
            variables: {uid},
            update: async store => {

                const {wishListsCurrentUser} = await store.readQuery({
                    query: GET_LISTS_CURRENT_USER,
                });

                store.writeQuery({
                    query: GET_LISTS_CURRENT_USER,
                    data: {
                        wishListsCurrentUser: wishListsCurrentUser.filter(
                            list => list.uid !== uid,
                        ),
                    },
                });

            },
        });
    }
}
