import { useState } from 'react'


import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Dashboard from './Pages/Dashboard/Dashboard'
import Orders from './Pages/Orders/Orders'
import Inventory from './Pages/Inventory/Inventory'
import Customers from './Pages/Customers/Customers'
import Analytics from './Pages/Analytics/Analytics'
import Settings from './Pages/Settings/Settings'
import EditMenuItems from './Pages/Menu-Items/EditMenuItems'
import { MenuProvider } from './context/MenuContext'
import AddItem from './Pages/Menu-Items/AddItem'
import Login from './Pages/Login/Login'
import { useDispatch, useSelector } from 'react-redux'
import { selectTheme } from './features/ThemeSlice'
import Logout from './Pages/Logout/Logout'
import ProtectedRoutes from './Pages/Login/ProtectedRoutes'
import { login } from './features/AuthSlice'

function App() {

  const theme = useSelector(selectTheme)
  const dispatch = useDispatch()
  
  return (
    <div className={theme === "dark" ? "dark-mode" : "light-mode"}>
    <MenuProvider>
     <Routes>
      <Route path='/' element={<Login/>} />
      <Route  element={<ProtectedRoutes> <Layout /> </ProtectedRoutes>}>
      <Route path='dashboard' element={<Dashboard /> }/>
      <Route path='orders' element={<Orders />} />
      <Route path='inventory' element={<Inventory />} />
      <Route path='edit/:id' element={<EditMenuItems />} />
      <Route path='addItem' element={<AddItem />} />
      <Route path='customers' element={<Customers />}/>
      <Route  path='analytics' element={<Analytics />}/>
      <Route path='settings' element={<Settings />}/>
      
      </Route>
     </Routes>
      </MenuProvider>

      
    </div>
  )
}

export default App
