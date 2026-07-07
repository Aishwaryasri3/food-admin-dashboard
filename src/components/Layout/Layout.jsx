import React from 'react'
import SideBar from '../SideBar/SideBar'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div style={{display:'flex'}}>
        <SideBar />
        <div style={{flex : 1}}>
            <Outlet />
        </div>
    </div>
  )
}

export default Layout