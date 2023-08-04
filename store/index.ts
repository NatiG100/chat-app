import {configureStore} from '@reduxjs/toolkit'
import preferenceReducer from './preferenceSlice'
import layoutReducer from './layoutSlice';
const store = configureStore({
    reducer:{
        preference:preferenceReducer,
        layout:layoutReducer,
    }
});
export type AppDispath = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>
export default store;