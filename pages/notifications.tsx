import {NextPage} from "next";
import MainLayout from "../components/layouts/MainLayout";
import React, {useEffect} from "react";
import {useAppDispatch} from "../redux/hooks";
import { setHide } from "../redux/reducers/toolbar.slice";

const Notifications: NextPage = () => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        // dispatch(setHide(true))
    })

    return (
        <MainLayout isHideHeader={true} isHideMenu={false}>
            Notifications page
        </MainLayout>
    )
}

export default Notifications
