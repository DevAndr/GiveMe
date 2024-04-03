'use client';

import React, {useEffect, useRef, useState} from "react";
import {Button} from 'primereact/button';
import Link from 'next/link';
import StepsForUse from "@/components/step/StepsForUse";
import Image from 'next/image';
// import {router} from "next/client";

export default function Home() {
    const sectionRef = useRef<null | HTMLElement>(null);
    //
    // // const dispatch = useAppDispatch()
    // // const router = useRouter()
    // // const breakpoints: any = useBreakpoint();
    // const observerRef = useRef<IntersectionObserver | null>(null);
    // // const {loading, error, data: checkAuthData} = useQuery(IS_AUTH);
    // // const {loading: loadingCurrentUser, error: errorCurrentUser, data: dataCurrentUser} = useQuery(CURRENT_USER);
    // const [isAuth, setIsAuth] = useState<boolean>()
    // const [currentUser, setCurrentUser] = useState<any>()
    //
    // // console.log(breakpoints)
    //
    // useEffect(() => {
    //     // fetching()
    //
    //     // const localTokens = AuthService.getLocalTokens()
    //     // if (localTokens.at && localTokens.rt && checkAuthData?.checkAuth?.isAuth) {
    //     //     setIsAuth(true)
    //     // } else {
    //     //     setIsAuth(false)
    //     // }
    //     //
    //     // setCurrentUser(dataCurrentUser?.currentUser)
    //
    //     observerRef.current = new IntersectionObserver(([entry]) => {
    //         // if (entry.isIntersecting) {
    //         //     const colorBG = entry.target.getAttribute('data-color')
    //         //     console.log(colorBG, sectionRef.current?.getAttribute('data-color'))
    //         //
    //         //     if (colorBG)
    //         //         dispatch(setBackgroundColor(colorBG))
    //         // } else {
    //         //     dispatch(setBackgroundColor('#fff'))
    //         // }
    //     })
    //
    //     return () => observerRef.current?.disconnect()
    // }, [])
    //
    // useEffect(() => {
    //     if (sectionRef.current)
    //         observerRef.current?.observe(sectionRef.current)
    // }, [sectionRef]);

    async function fetching() {
        // const localTokens = AuthService.getLocalTokens()
    }

    const handleCheckAuth = async () => {
        // if (isAuth) {
        //     // router.push('/editList')
        // } else {
        //     // router.push('/auth')
        // }
    };

    return (
        <div className="page landing">
            <section data-color={'#1c1c38'} ref={sectionRef} className="section present-section">
                <div className="container">
                    <div className="flex justify-content-center gap-6">
                        <div className="">
                            <p className="text-6xl m-0 font-medium text-left">Добро пожаловать</p>
                            <p className="font-medium text-xl">Это лучший срвис для осуществления желаний аноноимно
                                и безопасно для стримеров</p>
                            <p className="text-5xl m-0 font-semibold">Получай и дари</p>
                            <p className="font-semibold font-bold text-6xl m-0">ПОДАРКИ</p>
                            <p>Получай подарки и не бойся, что спалишь свой адрес</p>
                            <p>Мы защитим Вас от сталкеров</p>
                            <div>
                            </div>
                            <div className="mt-6">
                                <Button size="large" className="mr-4" label="Начать" onClick={handleCheckAuth}/>
                                <a href="#how-this-job">
                                    <Button size="large" className="p-button-outlined">
                                        Как это работает?
                                    </Button>
                                </a>
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
                            <img className="img-landing" style={{position: "relative"}}
                                 src={"images/img-square.png"} alt={"give me img"} width={240} height={240}/>
                        </div>
                    </div>
                </div>
            </section>
            <section className='section present-section'>
                <div className="container">
                    <h3 className="text-6xl m-0 font-medium text-center p-4 text-black-alpha-90">Наши
                        преимущества</h3>

                    <p>
                        Дождись проверки.
                        Мы проверим что мы можем тебе доставлять.
                        Обычно проверка не занимает много времени
                    </p>
                </div>
            </section>
            <section className='section present-section' id="how-this-job">
                <div className="container">
                    <h3 className="text-6xl m-0 font-medium text-center text-black-alpha-90 p-4">Как получать
                        подарки уже сейчас?</h3>
                    <StepsForUse/>
                </div>
            </section>
            <section className="section present-section">
                <div className="container">
                    <h3 className="text-6xl m-0 font-medium text-left">Поддержка популярных платформ</h3>
                    <p>
                      У нас можно получать подарки из крупных маркетплейсов: Wildberries и Ozon. В будущем будет Aliexpress, Яндекс Маркет
                    </p>
                    <div className='platforms'>
                        <Image className='company' src={'/images/wb.png'} alt={'Wildberries'} width={240} height={96}/>
                        <Image className='company' src={'/images/ozon.svg'} alt={'Ozon'} width={76} height={76}/>
                    </div>
                </div>
            </section>
            <section className="section present-section">
                <div className="container">
                    <h3 className="text-6xl m-0 font-medium text-left">Выгодно тем кто дарит</h3>
                    <p style={{width: 320, margin: 0}}>
                        У нас не высокая комиссия, всего 2%. Удобные спосбоы оплаты. Вы можете остаться анонимом или
                        указать свое имя и поздравление к поадрку
                    </p>

                </div>
            </section>
            <section className="section">
                <div className="container">
                    <div className="flex justify-content-center gap-2">
                        <h3 className="text-6xl m-0 font-medium text-left">Разобраться — просто</h3>
                    </div>
                    <div className="mt-4 h-10rem flex flex-column-reverse align-items-center">
                        <Link href="/auth">
                            <Button size="large" label="Начать пользоваться" className="m-2"/>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
