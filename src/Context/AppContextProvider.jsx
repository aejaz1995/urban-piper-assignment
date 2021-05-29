import React,{ useState } from 'react'
export const AppContext = React.createContext()

export  function AppContextProvider({children}) {

    const [ state, setState ] = useState({ results:[], isLoading: false, isError:false }) 
    const value = { state, setState }

    return  <AppContext.Provider value = { value } > {children} </AppContext.Provider>
}

 