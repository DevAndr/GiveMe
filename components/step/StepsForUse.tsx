import {Timeline} from 'primereact/timeline';
import {Card} from "primereact/card";
import {SyntheticEvent} from "react";
import './styles.scss'

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
        bgColor: '#8160fc',
        img: 'game-controller.jpg',
        description: ` Выбери что бы ты хотел получить в подарок. А мы соберем из этого списка твою персональную витрину подарков`
    },
    {
        id: 2,
        name: 'Размести ссылку',
        icon: 'pi pi-cog',
        colorIcon: '#6366F1',
        bgColor: '#8160fc',
        description: `Размести ссылку на персональную витрину на своем сайте, блоге или любой стриминговой
                                платформе.
                                Также ты можешь установить банер, чтобы твои подписчики узнали о том что теперь тебе можно
                                дарить подарки
                                и алерты на свой стрим, чтобы получать оповещение о подаренных подарках`
    },
    {
        id: 3,
        name: 'Главное желать',
        icon: 'pi pi-shopping-cart',
        colorIcon: '#6366F1',
        bgColor: '#8160fc',
        description: 'Ожидайте, когда Ваш поклонник решитсся сделать Вам приятное. А именно подарить что-то из списка желаний'
    },
    {
        id: 4,
        name: 'Доставка',
        icon: 'pi pi-gift',
        colorIcon: '#6366F1',
        bgColor: '#8160fc',
        description: 'Заберите подарок в удобном для вас пункте выдачи'
    },
    {
        id: 5,
        name: 'Получи подарок и расскажи о нем!',
        icon: 'pi pi-check',
        colorIcon: '#6366F1',
        bgColor: '#8160fc',
        description: `В личном кабинете ты узнаешь, когда и как ты получишь подарок. Когда он окажется у тебя,
                                не забудь рассказать о подарке и отметить нас @WishMeIt в Instagram или в ВКонтакте — мы
                                порадуемся с тобой`
    }
];

const events2 = [
    '2020', '2021', '2022', '2023'
];

const StepsForUse = () => {

    const customizedMarker = (item: IStepUser) => {
        return (
            <span className='markerStep' style={{backgroundColor: item.bgColor}}>
                <i className={`${item.icon} icon`}></i>
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
        <div className="steps">
            <Timeline value={steps} align="alternate" className="customized-timeline"
                      marker={customizedMarker} content={customizedContent}/>
        </div>

    )
}

export default StepsForUse