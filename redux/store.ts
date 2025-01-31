import {combineReducers, configureStore, applyMiddleware} from "@reduxjs/toolkit";
import toolbarReducer from './reducers/toolbar.slice'
import authReducer from './reducers/auth.slice'
import basketShopReducer from './reducers/basketshop.slice'


const rootReducer = combineReducers({
    toolbar: toolbarReducer,
    auth: authReducer,
    basketShop: basketShopReducer
});

export const store = configureStore({
    reducer: rootReducer,
    // middleware: (getDefaultMiddleware => getDefaultMiddleware().concat(postAPI.middleware))
})

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
