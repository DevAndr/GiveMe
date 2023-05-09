import {createSlice, current} from "@reduxjs/toolkit";

export interface IGiver {
    name?: string
    description?: string
}

interface IBasketShopState {
    showBasket: boolean
    products: any[]
    giver?: IGiver
    wishListName?: string
}

const initialState: IBasketShopState = {
    showBasket: false,
    products: [],
    giver: undefined,
    wishListName: ""
}

export const basketShop = createSlice({
    name: 'basketShop',
    initialState,
    reducers: {
        setHideBasket: (state, action) => {
            state.showBasket = action.payload
        },
        showBasket: (state, action) => {
            state.showBasket = action.payload
        },
        setGiver: (state, action) => {
            state.giver = {...state.giver, ...action.payload}
        },
        addProductToBasket: (state, action) => {
            const checkProduct = state.products.find(p => p?.id == action.payload.id)

            if (!checkProduct) {
                state.products.push(action.payload)
            }
        },
        removeProductInBasket: (state, action) => {
            const sorted = current(state.products).filter(p => p.id !== action.payload.id)
            console.log('removeProductInBasket', sorted)
            state.products = sorted
        }
    }
})

export const {setHideBasket, showBasket, setGiver, addProductToBasket, removeProductInBasket} = basketShop.actions
export default basketShop.reducer
