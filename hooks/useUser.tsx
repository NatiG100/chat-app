import { RootState } from "@/store";
import { TypeUser } from "@/types/enteties";
import { useSelector } from "react-redux";

export default function useUser(){
    const user = useSelector<RootState,TypeUser|null>((state)=>(state.user))
    return user;
}