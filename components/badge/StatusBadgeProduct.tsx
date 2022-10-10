import {FC} from "react";
import styled from "styled-components";
import {humanizedStatusProduct} from "../../utils";

export enum STATUS_PRODUCT {
    VALIDATION = 'VALIDATION',
    DELIVERY = 'DELIVERY',
    DELIVERED = 'DELIVERED',
    CANCELLED = 'CANCELLED',
    PROCESSING = 'PROCESSING',
    COMPLETED = 'COMPLETED',
    PENDING = 'PENDING',
    ACTIVE = 'ACTIVE',
    PAYED = 'PAYED'
}

export interface IStatusBadgeProduct {
    status: STATUS_PRODUCT
}

const colorForStatus = (status: STATUS_PRODUCT) => {
    switch (status) {
        case STATUS_PRODUCT.VALIDATION:
            return '#8e92ac'
        case STATUS_PRODUCT.DELIVERY:
            return '#6a71ff'
        case STATUS_PRODUCT.DELIVERED:
            return '#6a71ff'
        case STATUS_PRODUCT.CANCELLED:
            return '#ff7676'
        case STATUS_PRODUCT.PROCESSING:
            return '#0668f7'
        case STATUS_PRODUCT.COMPLETED:
            return '#52be66'
        case STATUS_PRODUCT.PENDING:
            return '#8e92ac'
        case STATUS_PRODUCT.ACTIVE:
            return '#0668f7'
        case STATUS_PRODUCT.PAYED:
            return '#e8cb50'
        default:
            return '#876aed'
    }
}

const StatusBadgeWrap = styled.label<IStatusBadgeProduct>`
  font-size: .7rem;
  font-weight: 400;
  font-variant-caps: all-petite-caps;
  border-radius: 0.3rem;
  padding: 0 .3rem;
  padding-bottom: .18rem;
  color: white;
  background-color: ${props => { 
    return colorForStatus(props.status)
  }};
  box-shadow: ${(props) => colorForStatus(props.status)} 0 1px 5px 1px
};
`

const StatusBadgeProduct: FC<IStatusBadgeProduct> = ({status}) => {

    return (
        <StatusBadgeWrap status={status}>
            {humanizedStatusProduct(status)}
        </StatusBadgeWrap>
    )
}

export default StatusBadgeProduct
