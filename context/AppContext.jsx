'use client'
import { useUser } from "@clerk/nextjs"
import { createContext, useContext } from "react"

export const AppContext = createContext()

export const AppContextProvider = ({children}) =>{

  const {user,isLoaded,isSignedIn} = useUser()
  const value={
    user,
    isLoaded,
    isSignedIn
    
  }

  return(
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
}

export const UseAppContext = () =>{
  return useContext(AppContext)
}