import {configureStore} from '@reduxjs/toolkit'
import preferenceReducer from './preferenceSlice'
import layoutReducer from './layoutSlice';
import userReducer from './authStore';
const store = configureStore({
    reducer:{
        preference:preferenceReducer,
        layout:layoutReducer,
        user:userReducer,
    }
});
export type AppDispath = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>
export default store;