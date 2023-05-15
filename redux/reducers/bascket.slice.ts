import {createSlice} from "@reduxjs/toolkit";

interface BasketShopState {
    isShow: boolean
    products: []
}

const initialState: BasketShopState = {
    isShow: false,
    products: []
}

export const basketShopSlice = createSlice({
    name: 'basketShop',
    initialState,
    reducers: {
        show: (state, action) => {
            state.isShow = action.payload
        }
    }
})

export const {show} = basketShopSlice.actions
export default basketShopSlice.reducer
