import React, {FC} from "react";
import styled, { css } from "styled-components";

export type MarketType = 'OZON' | 'WB'

type MarketPlaceProps = {
    type: MarketType
}

interface ITag {
    type: MarketType
}

const TagMarket = styled.label<ITag>`
  font-size: .65rem;
  color: white;
  padding: .2rem .4rem;
  border-radius: .3rem;
  background: ${props => props.type === 'OZON' ? "#0068fd" :
          "linear-gradient(90deg, rgba(214,0,255,1) 0%, rgba(119,0,255,1) 100%)"};
  box-shadow: ${props => props.type === 'OZON' ? `#0068fd 0 1px 5px 1px` : `#d600ff 0 1px 5px 1px`};

  ::before {
    padding-right: .2rem;
  }
`

const MarketPlace: FC<MarketPlaceProps> = ({type}, props) => {

    return (
        <TagMarket {...props} type={type} className="pi pi-shopping-bag">{type}</TagMarket>
    )
}

export default MarketPlace
