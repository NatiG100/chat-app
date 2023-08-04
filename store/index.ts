import {configureStore} from '@reduxjs/toolkit'
import preferenceReducer from './preferenceSlice'
const store = configureStore({
    reducer:{
        preference:preferenceReducer
    }
});
export type AppDispath = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>
export default store;