import { TypeUser } from "@/types/enteties";
import { createSlice } from "@reduxjs/toolkit"

type UserSliceState = Partial<TypeUser>&{loaded:boolean}
const initialState:UserSliceState={loaded:true} as UserSliceState;


const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        login:(state,action:{payload:TypeUser,type:string})=>{
            state = {...state,...action.payload}
            return state;
        },
        logout:(state,action:{payload:null|undefined,type:string})=>{
            state ={loaded:true};
            return state;
        }
    }
});

export const {login,logout} = userSlice.actions;
const userReducer =  userSlice.reducer;
export default userReducer;