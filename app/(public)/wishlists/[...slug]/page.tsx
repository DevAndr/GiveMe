import React, {FC,} from 'react';
import {
    GET_PRODUCTS_BY_UID_LIST,
    GET_PRODUCTS_BY_UID_LIST_PUBLIC,
    GET_USER_BY_UID,
    PATH_ORDER,
    useProductsWishList
} from '@/graphql';
import WishListPublic from '@/components/wishlist/WishListPublic';
import {useMutation, useQuery} from '@apollo/client';
import {ParamsPathOrder, ResponseGetUser, ResponsePathOrder} from '@/graphql/types';
import GoToCartWidget from '@/components/widget/GoToCartWidget';
import {Button} from 'primereact/button';
import LocalCartService from '@/services/LocalCartService';
import LocalStorageService from '@/services/LocalStorageService';
// import {useRouter} from 'next/navigation';
import {useStore} from '@/providers/store/StoreProvider';
import {getClient} from '@/graphql/clientSSR';
import '../../../styles/base-page.scss'

interface WishListByUserPageProps {
    params: {
        slug: string[]
    };
}


const WishListByUserPage: FC<WishListByUserPageProps> = async ({params}) => {
        const [idUser, idList] = params.slug;
        const keyList = `${idUser}/${idList}`;
        // const router = useRouter();
        // const {cart, removeProduct, addProduct} = useStore()
        // const [fetchOrder, {
        //     data: dataOrder,
        //     loading: loadingOrder,
        //     error: errorOrder
        // }] = useMutation<ResponsePathOrder, ParamsPathOrder>(PATH_ORDER);

        const {data: userData} = await getClient().query({
            query: GET_USER_BY_UID,
            variables: {id: idUser}
        });

        const {data} = await getClient().query({
            query: GET_PRODUCTS_BY_UID_LIST_PUBLIC,
            variables: {idWishList: idList}
        });

        const goToOrderHandle = async () => {
            // if (cart.productIds.length > 0) {
            //     fetchOrder({
            //             variables: {
            //                 data: {
            //                     productIds: cart.productIds
            //                 }
            //             }
            //         }
            //     ).then(resp => {
            //         console.log(resp);
            //         const id = resp.data?.pathOrder?.id;
            //         LocalStorageService.add('orderId', id || '');
            //
            //         router.push(`/view/order/${id}`);
            //         console.log(id);
            //     });
            // }
        };

        return (
            <div className="page container">
                <h3 className="pageTitle">{userData?.user?.name} мечтает о</h3>
                <div className="flex-col">
                    <div>{data && <WishListPublic keyList={keyList} selectedProducts={[]}

                                                  products={data.productsWishListPublic}/>}</div>
                </div>
                {/*<GoToCartWidget count={cart.productIds.length} onClick={goToOrderHandle}/>*/}
            </div>
        );
    }
;

export default WishListByUserPage;