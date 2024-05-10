import React, {FC} from 'react';
import './styles.scss';
import {MarketType} from '@/graphql/types';

interface MarketPlaceProps {
    type: MarketType;
}

const MarketPlace: FC<MarketPlaceProps> = ({type}) => {
    return (
        <div className={`market-place ${type === 'OZON' ? 'ozon' : 'wb'}`}>
            {type}
        </div>
    );
};

export default MarketPlace;