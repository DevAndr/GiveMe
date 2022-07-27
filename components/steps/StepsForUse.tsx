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
        name: 'Ordered',
        icon: 'pi pi-shopping-cart',
        colorIcon: '#6366F1',
        bgColor: '#c5b5ff',
        img: 'game-controller.jpg',
        description: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error
                    repudiandae numquam deserunt
                    quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate
                    neque quas!`
    },
    {
        id: 2,
        name: 'Processing',
        icon: 'pi pi-cog',
        colorIcon: '#6366F1',
        bgColor: '#ac9aff',
        description: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error
                    repudiandae numquam deserunt
                    quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate
                    neque quas!`
    },
    {
        id: 3,
        name: 'Shipped',
        icon: 'pi pi-shopping-cart',
        colorIcon: '#6366F1',
        bgColor: '#9580ff',
        description: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error
                    repudiandae numquam deserunt
                    quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate
                    neque quas!`
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
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error
                    repudiandae numquam deserunt
                    quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate
                    neque quas!</p>
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
