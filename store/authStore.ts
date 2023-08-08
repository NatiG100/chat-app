import { TypeUser } from "@/types/enteties";
import { createSlice } from "@reduxjs/toolkit"

type UserSliceState = TypeUser|null
const initialState:UserSliceState=null as UserSliceState;

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        login:(state,action:{payload:TypeUser,type:string})=>{
            state = action.payload
            return state;
        },
        logout:(state,action:{payload:null|undefined,type:string})=>{
            state =null;
            return state;
        }
    }
});

export const {login,logout} = userSlice.actions;
const userReducer =  userSlice.reducer;
export default userReducer;