import {GetServerSideProps, GetStaticPaths, GetStaticProps, NextPage} from "next";
import Head from "next/head";
import MainLayout from "../../../components/layouts/MainLayout";
import React, {useEffect, useState} from "react";
import WishList from "../../../components/wish-list/WishList";
import {useQuery} from "@apollo/client";
import {GET_LIST_BY_ID_FOR_USER, GET_USER_BY_UID} from "../../../services/graphql";
import {setHideBasket} from "../../../redux/reducers/basketshop.slice";
import BasketShopDialog from "../../../components/dialogs/BasketShopDialog";
import {useAppDispatch, useAppSelector} from "../../../redux/hooks";
import {Badge} from "primereact/badge";

interface IViewList {
    uidUser: string
    uidList: string
    data: any
}

const ViewList: NextPage<IViewList> = ({uidList, uidUser, data}) => {
    const dispatch = useAppDispatch()
    const {showBasket, products: basketProducts} = useAppSelector(state => state.basketShop)
    const {
        loading: loadingCurrentUser,
        error: errorCurrentUser,
        data: dataCurrentUser
    } = useQuery(GET_USER_BY_UID, {variables: {uid: uidUser}});

    const {
        loading: loadingWishList,
        error: errorWishList,
        data: dataWishList
    } = useQuery(GET_LIST_BY_ID_FOR_USER, {variables: {uidUser, uidList}});

    useEffect(() => {
        // client.query({query: GET_USER_BY_UID, variables: {uid: uidUser}}).then(r => {
        //     console.log(r.data)
        // })

        console.log(uidUser, uidList)
    }, [])

    const WishListHeaderSection = () => {
        if (loadingWishList)
            return <div>Loaging...</div>

        if (dataWishList?.wishLisByIdForUser) {
            const {name, description} = dataWishList.wishLisByIdForUser

            return <div className="flex flex-column">
                <h1 className="pb-0 mb-2">
                    {name}
                </h1>
                {
                    description && <p className="p-0 m-0">
                        {description && description}
                    </p>
                }
            </div>
        } else {
            return <div className="flex align-items-baseline">
                <h1>
                    Список желаний не доступен
                </h1>
            </div>
        }
    }

    const UserSection = () => {
        if (loadingCurrentUser)
            return <div>Loaging...</div>

        if (dataCurrentUser?.user) {
            const {name, email} = dataCurrentUser.user
            console.log()
            return <div className="flex align-items-baseline">
                <h2>
                    {name}
                </h2>
                <h5 className="ml-4">
                    {/*{email}*/}
                </h5>
            </div>
        }
    }

    const handleShowBasketHop = () => {
        dispatch(setHideBasket(!showBasket))
    }

    return (
        <>
            <Head>
                <title>Give Me: Списк желаний {
                    dataCurrentUser?.user && dataCurrentUser.user?.name
                }
                    {
                        dataWishList?.wishLisByIdForUser && ": " + dataWishList.wishLisByIdForUser?.name
                    }</title>
                <meta name="description" content="Generated by create next app"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <MainLayout isHideHeader={true} isHideMenu={true} isPresentView={true}>
                <div className="fixed top-0 right-0">
                    <i className="pi pi-shopping-cart mr-4 p-text-secondary p-overlay-badge hover:bg-black-alpha-10 border-circle p-2 cursor-pointer mt-3"
                       style={{fontSize: '1.4rem'}} onClick={handleShowBasketHop}>
                        {
                            3 ? <Badge className="p-0 m-0 text-xs mt-2 mr-2" value={3}/> : <></>
                        }
                    </i>
                </div>
                <div className="flex justify-content-center flex-column align-items-center">
                    <div>
                        {
                            WishListHeaderSection()
                        }
                    </div>
                    <div className="flex justify-content-between w-full pr-8 pl-8">
                        {
                            UserSection()
                        }
                    </div>
                    <WishList/>
                </div>
                <BasketShopDialog visible={showBasket} onHide={() => {
                    dispatch(setHideBasket(!showBasket))
                }} onSave={() => {
                    router.push('/payment')
                }} onShow={() => {
                    dispatch(setHideBasket(!showBasket))
                }}/>
            </MainLayout>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    // const res = await fetch('https://jsonplaceholder.typicode.com/todos/1')
    // const data = await res.json()
    const {uidList, uidUser} = context.query

    // console.log(context.req.cookies)

    // return {
    //     notFound: true,
    // }
    // const resp = await client.query({query: GET_USER_BY_UID, variables: {uid: uidUser},
    //     context: {headers: {... context.req.headers, Authorization: `Bearer ${context.req.cookies.access_token}`}}
    // })

    return {
        props: {
            uidList,
            uidUser,
            // data
        }
    }
}

export default ViewList
