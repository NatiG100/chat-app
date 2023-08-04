import { createSlice } from "@reduxjs/toolkit"

export type TypeLayout = {
    sidebarOpen:boolean
}

const initialState:TypeLayout={
    sidebarOpen:false,
}

const preferenceSlice = createSlice({
    name:'preference',
    initialState,
    reducers:{
        openSidebar:(state,action:{payload:null|undefined,type:string})=>{
            state.sidebarOpen = true
        },
        closeSidebar:(state,action:{payload:null|undefined,type:string})=>{
            state.sidebarOpen = false
        }
    }
});

export const {openSidebar,closeSidebar} = preferenceSlice.actions;
const layoutReducer =  preferenceSlice.reducer;
export default layoutReducer;