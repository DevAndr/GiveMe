import React, {FC} from 'react';
import {MarketType} from '@/components/dialogs/ProductDialog';
import './styles.scss';

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