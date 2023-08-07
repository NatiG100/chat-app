"use client"
import store, { RootState } from "@/store";
import { TypePreference } from "@/store/preferenceSlice";
import { ReactNode } from "react";
import { Provider, useSelector } from "react-redux";
import { Inter } from 'next/font/google'
import { Metadata } from "next";
import './globals.css'
import {QueryClient,QueryClientProvider} from 'react-query'

const inter = Inter({ subsets: ['latin'] })
export const metadata: Metadata = {
    title: 'Chat app',
    description: 'A chat application',
}
const queryClient = new QueryClient({defaultOptions:{mutations:{retry:0},queries:{retry:3}}});
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
    const preference = useSelector<RootState,TypePreference>((state)=>(state.preference))
    return (
        <html lang="en" className={preference.theme}>
            <body className={inter.className}>
                {children}
            </body>
        </html>
    )
}