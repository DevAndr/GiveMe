import {createSlice} from "@reduxjs/toolkit";

interface IAuthState {
    visibleAuthDialog: boolean
    isAuth: boolean
}

const initialState: IAuthState = {
    visibleAuthDialog: false,
    isAuth: false
}

export const authSlice = createSlice({
    name: 'toolbar',
    initialState,
    reducers: {
        setVisibleAuthDialog: (state, action) => {
            state.visibleAuthDialog = action.payload
        }
    }
})

export const {setVisibleAuthDialog} = authSlice.actions
export default authSlice.reducer
