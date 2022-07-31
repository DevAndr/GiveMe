import {createSlice} from "@reduxjs/toolkit";

interface IToolbarState {
    hide: boolean
}

const initialState: IToolbarState = {
    hide: false
}

export const toolbarSlice = createSlice({
    name: 'toolbar',
    initialState,
    reducers: {
        setHide: (state, action) => {
            state.hide = action.payload
        }
    }
})

export const {setHide} = toolbarSlice.actions
export default toolbarSlice.reducer
