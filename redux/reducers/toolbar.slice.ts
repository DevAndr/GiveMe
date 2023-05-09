import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface IToolbarState {
    hide: boolean
    backgroundColor?: string
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
        },
        setBackgroundColor: (state, action: PayloadAction<string>) => {
            state.backgroundColor = action.payload
        }
    }
})

export const {setHide, setBackgroundColor} = toolbarSlice.actions
export default toolbarSlice.reducer
