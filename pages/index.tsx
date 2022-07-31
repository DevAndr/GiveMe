import type {NextPage} from 'next'
import {Button} from 'primereact/button';
import Head from 'next/head'
import MainLayout from '../components/layouts/MainLayout';
import {useEffect} from "react";
import {useBreakpoint} from "../hooks/breakpoint";
import {Image} from 'primereact/image';
import {Card} from 'primereact/card';
import style from "../styles/home.module.scss"
import StepsForUse from "../components/steps/StepsForUse";

const Home: NextPage = () => {
    const breakpoints: any = useBreakpoint();

    useEffect(() => {

    }, [])

    const header = (
        <Image className="w-1" alt="Card" src="images/gift.png"
               onError={(e: any) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'}/>
    );

    return (
        <>
            <Head>
                <title>Give Me - Главная</title>
                <meta name="description" content="Generated by create next app"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <MainLayout>
                <div className={style.ContainerPage}>
                    <section className={style.ContainerColumn}>
                        <div className={`${style.RowColumn} px-4 align-self-center`}>
                            <p className="text-6xl m-0 font-medium text-left">Добро пожаловать</p>
                            <p className="font-medium text-xl">Это лучший срвис для осуществления жеданий аноноимно
                                и безопасно для стримеров</p>
                            <p className="text-5xl m-0 font-semibold">Получай и дари</p>
                            <p className="font-semibold font-bold text-6xl m-2">ПОДАРКИ</p>
                            <p>Получай подарки и не бойся, что спалишь свой адрес</p>
                            <p>Мы защитим Вас от сталкеров</p>
                            <div className="flex justify-content-center">
                                <Button label='Начать' className="m-2"/>
                                <Button label='Как это работает?' className="p-button-outlined m-2"/>
                            </div>
                        </div>

                        <div className={`${style.RowColumn} px-4 align-self-center`}>

                            <Card title="Advanced Card" subTitle="Subtitle" style={{width: '25em'}} header={header}>
                                <p className="m-0" style={{lineHeight: '1.5'}}>
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt
                                    quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis
                                    esse, cupiditate neque quas!</p>
                            </Card>
                        </div>
                    </section>

                    <section className={`${style.ContainerColumn} ${style.BlockSection}`}>
                        <div>
                            <h2 className="text-5xl m-0 font-medium text-center p-4">Наши преимущества</h2>

                            Дождись проверки
                            Мы проверим что мы можем тебе доставлять. Обычно проверка не занимает много времени
                        </div>
                    </section>

                    <section className={`${style.ContainerColumn} ${style.BlockSection}`}>
                        <div>
                            <h5 className="text-5xl m-0 font-medium text-center p-4">Как получать подарки уже
                                сейчас?</h5>

                            <StepsForUse/>

                            Заполни список желаний
                            Выбери что бы ты хотел получить в подарок. А мы соберем из этого списка твою персональную
                            витрину подарков
                            <br/>
                            <br/>
                            Размести ссылку
                            Размести ссылку на персональную витрину на своем сайте, блоге или любой стриминговой
                            платформе.
                            Также ты можешь установить банер, чтобы твои подписчики узнали о том что теперь тебе можно
                            дарить подарки
                            и алерты на свой стрим, чтобы получать оповещение о подаренных подарках
                            <br/>
                            <br/>
                            Получи подарок и расскажи о нем!
                            В личном кабинете ты узнаешь, когда и как ты получишь подарок. Когда он окажется у тебя,
                            не забудь рассказать о подарке и отметить нас @WishMeIt в Instagram или в ВКонтакте — мы
                            порадуемся с тобой
                            <br/>
                            <br/>
                            Получи подарок и расскажи о нем!
                            В личном кабинете ты узнаешь, когда и как ты получишь подарок. Когда он окажется у тебя,
                            не забудь рассказать о подарке и отметить нас @WishMeIt в Instagram или в ВКонтакте — мы
                            порадуемся с тобой
                            <br/>
                            <br/>
                            Получи подарок и расскажи о нем!
                            В личном кабинете ты узнаешь, когда и как ты получишь подарок. Когда он окажется у тебя,
                            не забудь рассказать о подарке и отметить нас @WishMeIt в Instagram или в ВКонтакте — мы
                            порадуемся с тобой
                            <br/>
                            <br/>
                            Получи подарок и расскажи о нем!
                            В личном кабинете ты узнаешь, когда и как ты получишь подарок. Когда он окажется у тебя,
                            не забудь рассказать о подарке и отметить нас @WishMeIt в Instagram или в ВКонтакте — мы
                            порадуемся с тобой
                            <br/>
                            <br/>
                            Получи подарок и расскажи о нем!
                            В личном кабинете ты узнаешь, когда и как ты получишь подарок. Когда он окажется у тебя,
                            не забудь рассказать о подарке и отметить нас @WishMeIt в Instagram или в ВКонтакте — мы
                            порадуемся с тобой
                        </div>
                    </section>

                </div>
            </MainLayout>
        </>
    )
}

export default Home
