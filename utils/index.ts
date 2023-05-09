import {STATUS_PRODUCT} from "../components/badge";

export const humanizedStatusProduct = (status: STATUS_PRODUCT): string => {
    switch (status) {
        case STATUS_PRODUCT.VALIDATION:
            return 'на проверке';
        case STATUS_PRODUCT.DELIVERY:
            return 'доставка';
        case STATUS_PRODUCT.DELIVERED:
            return 'доставлено';
        case STATUS_PRODUCT.CANCELLED:
            return 'отменено';
        case STATUS_PRODUCT.PROCESSING:
            return 'в процессе';
        case STATUS_PRODUCT.COMPLETED:
            return 'подарено';
        case STATUS_PRODUCT.PENDING:
            return 'ожидание';
        case STATUS_PRODUCT.ACTIVE:
            return 'активно';
        case STATUS_PRODUCT.PAYED:
            return 'оплачено';

    }
}
