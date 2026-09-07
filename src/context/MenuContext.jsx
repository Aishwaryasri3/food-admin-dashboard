import { createContext, useState, useEffect } from "react";

export const MenuContext = createContext()
export const MenuProvider = ({children}) => {
     const[menu, setMenu] = useState([])
      const[loading, setLoading] = useState(true)
      const[error, setError] = useState('')
      
       const fetchMenu = async () => {
    setLoading(true)
    try{
      const response = await fetch('https://food-cart-4d5c.onrender.com/foods')
      const data = await response.json()
      setMenu(data)
    }
    catch(error){
      setError(error.message)
    }
    finally{
      setLoading(false)
    }
  }


  useEffect(() => {
      fetchMenu()
    },[])
  
    return (
        <MenuContext.Provider value={{menu, setMenu, loading, error,  fetchMenu}}>
                    {children}
        </MenuContext.Provider>
    )
}