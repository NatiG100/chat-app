import { createSlice } from "@reduxjs/toolkit"

export type TypePreference = {
    theme:"dark"|"light"
}

const initialState:TypePreference={
    theme:"dark",
}

const preferenceSlice = createSlice({
    name:'preference',
    initialState,
    reducers:{
        toggleTheme:(state,action:{payload:null|undefined,type:string})=>{
            if(state.theme==="dark"){
                state.theme = "light"
            }else{
                state.theme = "dark"
            }
        }
    }
});

export const {toggleTheme} = preferenceSlice.actions;
const preferenceReducer =  preferenceSlice.reducer;
export default preferenceReducer;