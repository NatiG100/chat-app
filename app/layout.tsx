"use client"
import store, { RootState } from "@/store";
import { TypePreference } from "@/store/preferenceSlice";
import { ReactNode, useEffect } from "react";
import { Provider, useSelector,useDispatch } from "react-redux";
import { Inter } from 'next/font/google'
import { Metadata } from "next";
import './globals.css'
import {QueryClient,QueryClientProvider,useQuery} from 'react-query'
import AuthService from "@/services/authService";
import { TypeUser } from "@/types/enteties";
import { TypeErrorRes } from "@/types/api";
import { login } from "@/store/authStore";
import {savePath, saveQuery} from '@/utils';
import { usePathname, useSearchParams } from "next/navigation";

const inter = Inter({ subsets: ['latin'] })
export const metadata: Metadata = {
    title: 'Chat app',
    description: 'A chat application',
}
const queryClient = new QueryClient({
    defaultOptions:{
        mutations:{
            retry:0,
        },
        queries:{
            retry:2,
            cacheTime:10,
            refetchOnMount:false,
            refetchOnWindowFocus:false,
        }
    },  
});
export default function LayoutWithProvider({children}:{children:ReactNode}){
    return(
        <QueryClientProvider client={queryClient}>
            <Provider store={store}>
                <RootLayout>{children}</RootLayout>
            </Provider>
        </QueryClientProvider>
    )
}

function RootLayout({children}:{children:ReactNode}){
    const dispatch = useDispatch();
    const preference = useSelector<RootState,TypePreference>((state)=>(state.preference))
    const {data,isLoading,isError,error} = useQuery<TypeUser,TypeErrorRes>('me',AuthService.me);
    useEffect(()=>{
        if(data){
            dispatch(login(data))
        }
    },[data]);
    const path = usePathname();
    const query = useSearchParams();
    useEffect(()=>{
        return ()=>{
            savePath(path)
            saveQuery(query.toString());
        }
    },[path,query])
    return (
        <html lang="en" className={preference.theme}>
            <body className={inter.className}>
                {children}
            </body>
        </html>
    )
}