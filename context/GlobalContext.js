'use client'


//creating a context
import {createContext, useContext, useState} from "react";

const GlobalContext = createContext() 

//creating a provider
export function GlobalProvider({ children }) {
    const [unreadCount, setUnreadCount] = useState(0)
    
    return (
        <GlobalContext.Provider 
            value={{
                unreadCount, setUnreadCount,
            }}
            >
            { children }
        </GlobalContext.Provider>
    )
}

//creating a custom hook to access context
export function useGlobalContext() {
    return useContext(GlobalContext)
}