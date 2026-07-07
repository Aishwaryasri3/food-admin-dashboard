import React from 'react'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectIsLoggedIn } from '../../features/AuthSlice'
const ProtectedRoutes = ({children}) => {
    
    const isLoggedIn = useSelector(selectIsLoggedIn)
    if(!isLoggedIn){
        return <Navigate to="/"  />
    }
  return children
}

export default ProtectedRoutes