import type {NextPage} from 'next'
import {Button} from 'primereact/button';
import Head from 'next/head'
import MainLayout from '../components/layouts/MainLayout';
import {useEffect, useRef, useState} from "react";
import {useBreakpoint} from "../hooks/breakpoint";
import {Image} from 'primereact/image';
import imgSource from "../assets/images/img-square.png"
import {Card} from 'primereact/card';
import variables from '../styles/variables.module.scss'
import style from "../styles/home.module.scss"
import stylePage from "../styles/page.module.scss"
import AuthService from "../services/auth.service";
import {useRouter} from "next/router";
import {CURRENT_USER, IS_AUTH, REFRESH_TOKEN} from "../services/graphql";
import {gql, useMutation, useQuery} from "@apollo/client";
import client from "../services/graphql/client";
import {ParamsRefreshToken, ResponseRefreshToken} from "../services/graphql/types";
import StepsForUse from "../components/steps/StepsForUse";
import Link from "next/link";
import {useAppDispatch} from "../redux/hooks";
import {setBackgroundColor} from "../redux/reducers/toolbar.slice";

const Home: NextPage = () => {
    const dispatch = useAppDispatch()
    const router = useRouter()
    const breakpoints: any = useBreakpoint();
    const observerRef = useRef<IntersectionObserver | null>(null);
    const sectionRef = useRef<null | HTMLElement>(null)
    // const {loading, error, data: checkAuthData} = useQuery(IS_AUTH);
    const {loading: loadingCurrentUser, error: errorCurrentUser, data: dataCurrentUser} = useQuery(CURRENT_USER);
    const [isAuth, setIsAuth] = useState<boolean>()
    const [currentUser, setCurrentUser] = useState<any>()

    console.log(breakpoints)

    useEffect(() => {
        // fetching()

        // const localTokens = AuthService.getLocalTokens()
        // if (localTokens.at && localTokens.rt && checkAuthData?.checkAuth?.isAuth) {
        //     setIsAuth(true)
        // } else {
        //     setIsAuth(false)
        // }
        //
        // setCurrentUser(dataCurrentUser?.currentUser)


        observerRef.current = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                const colorBG = entry.target.getAttribute('data-color')
                console.log(colorBG, sectionRef.current?.getAttribute('data-color'))

                if (colorBG)
                    dispatch(setBackgroundColor(colorBG))
            } else {
                dispatch(setBackgroundColor('#fff'))
            }
        })

        return () => observerRef.current?.disconnect()
    }, [])

    useEffect(() => {
        if (sectionRef.current)
            observerRef.current?.observe(sectionRef.current)
    }, [sectionRef]);

    async function fetching() {
        const localTokens = AuthService.getLocalTokens()
    }

    const handleCheckAuth = async () => {
        if (isAuth) {
            router.push('/editList')
        } else {
            router.push('/auth')
        }
    }

    const header = (
        <Image className="w-1" alt="Card" src="images/gift.png"
               onError={(e: any) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'}/>
    );

    return (
        <MainLayout isHideHeader={false} isHideMenu={true}
                    meta={{title: "Give Me - лучший инструмент получать подарки"}}>
            <section data-color={'#1c1c38'} ref={sectionRef} className={`${style.Section} ${style.PresentSection}`}>
                <div className={`${stylePage.container}`}>
                    <div className="flex justify-content-center gap-6">
                        <div className="">
                            <p className="text-6xl m-0 font-medium text-left">Добро пожаловать</p>
                            <p className="font-medium text-xl">Это лучший срвис для осуществления жеданий аноноимно
                                и безопасно для стримеров</p>
                            <p className="text-5xl m-0 font-semibold">Получай и дари</p>
                            <p className="font-semibold font-bold text-6xl m-0">ПОДАРКИ</p>
                            <p>Получай подарки и не бойся, что спалишь свой адрес</p>
                            <p>Мы защитим Вас от сталкеров</p>
                            <div>
                            </div>
                            <div className="mt-6">
                                <Button size="large" className="mr-4" label="Начать" onClick={handleCheckAuth}/>
                                <Button size="large" className="p-button-outlined"><a href="#how-this-job">Как это
                                    работает?</a></Button>
                            </div>
                        </div>

                        <div className="wrapperImg">
                            <div style={{position: "relative"}}>
                                <div style={{
                                    width: 240,
                                    height: 240,
                                    backgroundColor: "rgb(255,241,195)",
                                    borderRadius: 24,
                                    position: "absolute",
                                    top: 15,
                                    right: 15
                                }}></div>
                                <div style={{
                                    width: 240,
                                    height: 240,
                                    backgroundColor: "rgb(168,118,255)",
                                    borderRadius: 24,
                                    position: "absolute",
                                    top: 10,
                                    right: 10
                                }}></div>
                                <div style={{
                                    width: 240,
                                    height: 240,
                                    backgroundColor: "#62d8b2",
                                    borderRadius: 24,
                                    position: "absolute",
                                    top: 5,
                                    right: 5
                                }}></div>
                            </div>
                            <img className={style.imgLanding} style={{position: "relative"}}
                                 src={"images/img-square.png"} alt={"give me img"} width={240} height={240}/>
                        </div>
                    </div>
                </div>
            </section>
            <section>
                <div className={stylePage.container}>
                    <h2 className="text-6xl m-0 font-medium text-center p-4 text-black-alpha-90">Наши
                        преимущества</h2>

                    Дождись проверки
                    Мы проверим что мы можем тебе доставлять. Обычно проверка не занимает много времени
                </div>
            </section>
            <section id="how-this-job">
                <div className={stylePage.container}>
                    <h2 className="text-6xl m-0 font-medium text-center text-black-alpha-90 p-4">Как получать
                        подарки уже сейчас?</h2>
                    <StepsForUse/>
                </div>
            </section>
            <section className={`${style.Section} ${style.PresentSection}`}>
                <div className={stylePage.container}>
                    <div className="flex justify-content-center gap-6">
                        <h2 className="text-6xl m-0 font-medium text-left">Поддержка популярных платформ</h2>
                    </div>
                </div>
            </section>
            <section className={`${style.Section}`}>
                <div className={stylePage.container}>
                    <div className="flex justify-content-center gap-6">
                        <h2 className="text-6xl m-0 font-medium text-left">Разобраться — просто</h2>
                    </div>
                    <div className="mt-4 h-10rem flex flex-column-reverse align-items-center">
                        <Link href="/auth/auth">
                            <Button size="large" label="Начать пользоваться" className="m-2"/>
                        </Link>
                    </div>
                </div>
            </section>
        </MainLayout>
    )
}

export default Home
