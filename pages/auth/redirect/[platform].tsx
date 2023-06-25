import React, {FC, useEffect} from "react";
import MainLayout from "../../../components/layouts/MainLayout";
import Loader from "../../../components/Loader/Loader";
import {useRouter} from "next/router";
import {useAuthWithTwitch} from "../../../services/graphql";

const Redirect: FC = () => {
    const router = useRouter();
    const {platform} = router.query;
    const [authWithTwitch] = useAuthWithTwitch()

    useEffect(() => {
        if (platform === 'twitch') {
            const code = router.query.code as string

            if (code) {
                authWithTwitch({variables: {code}}).then(resp => {
                    if (resp.data) {
                        console.log(resp.data)
                    }
                })
            }
        }
    }, [platform]);

    if (!platform)
        return <></>;

    return (
        <MainLayout isHideHeader={true} isHideFooter={true} className="min-h-screen justify-content-center" meta={{title: 'Give Me'}}>
            <div className="flex flex-column justify-content-center">
                <h1>Авторизация</h1>
                <Loader strokeWidth="4"/>
            </div>
        </MainLayout>
    );
};

export default Redirect;