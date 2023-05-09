import {Timeline} from 'primereact/timeline';
import {Card} from "primereact/card";
import style from "../../styles/steper.module.scss"
import {SyntheticEvent} from "react";

interface IStepUser {
    id: number
    name: string
    icon: string
    colorIcon: string
    bgColor: string
    img?: string
    description?: string
}

const steps: IStepUser[] = [
    {
        id: 1,
        name: 'Заполни список желаний',
        icon: 'pi pi-shopping-cart',
        colorIcon: '#6366F1',
        bgColor: '#c5b5ff',
        img: 'game-controller.jpg',
        description: ` Выбери что бы ты хотел получить в подарок. А мы соберем из этого списка твою персональную витрину подарков`
    },
    {
        id: 2,
        name: 'Размести ссылку',
        icon: 'pi pi-cog',
        colorIcon: '#6366F1',
        bgColor: '#ac9aff',
        description: `Размести ссылку на персональную витрину на своем сайте, блоге или любой стриминговой
                                платформе.
                                Также ты можешь установить банер, чтобы твои подписчики узнали о том что теперь тебе можно
                                дарить подарки
                                и алерты на свой стрим, чтобы получать оповещение о подаренных подарках`
    },
    {
        id: 3,
        name: 'Получи подарок и расскажи о нем!',
        icon: 'pi pi-shopping-cart',
        colorIcon: '#6366F1',
        bgColor: '#9580ff',
        description: `В личном кабинете ты узнаешь, когда и как ты получишь подарок. Когда он окажется у тебя,
                                не забудь рассказать о подарке и отметить нас @WishMeIt в Instagram или в ВКонтакте — мы
                                порадуемся с тобой`
    },
    {
        id: 4,
        name: 'Delivered',
        icon: 'pi pi-check',
        colorIcon: '#6366F1',
        bgColor: '#8160fc',
        description: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error
                    repudiandae numquam deserunt
                    quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate
                    neque quas!`
    }
];

const events2 = [
    '2020', '2021', '2022', '2023'
];

const StepsForUse = () => {

    const customizedMarker = (item: IStepUser) => {
        return (
            <span className={style.MarkerStep} style={{backgroundColor: item.bgColor}}>
                <i className={`${item.icon} ${style.icon}`}></i>
            </span>
        );
    };


    const customizedContent = (item: IStepUser) => {
        return (
            <Card title={item.name} subTitle={`Шаг ${item.id}`}>
                {item.img && <img src={`images/product/${item.img}`}
                                    onError={(e:SyntheticEvent<HTMLImageElement>) => e.currentTarget.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'}
                                    alt={item.name} width={200} className="shadow-1"/>}
                <p>{item.description}</p>
            </Card>
        );
    };

    return (
        <div className="card">
            <Timeline value={steps} align="alternate" className="customized-timeline"
                      marker={customizedMarker} content={customizedContent}/>
        </div>

    )
}

export default StepsForUse
