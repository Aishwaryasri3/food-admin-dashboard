import React from 'react'
import './SideBar.css'

import adminLogo from '../../assets/adminLogo.png'

import { NavLink, useNavigate } from 'react-router-dom'
import {MdDashboard, MdInventory,  MdAnalytics, MdSettings, MdLogout} from 'react-icons/md'
import {FaClipboard, FaUser, FaFileAlt, FaLock} from 'react-icons/fa'
import { logout } from '../../features/AuthSlice'
import { useDispatch } from 'react-redux'

const SideBar = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const sideItems = [
        {name : 'Dashboard', path : 'dashboard', icon:<MdDashboard/>},
        {name : 'Orders', path:'orders', icon:<FaClipboard />},
        {name : 'Inventory',path:'inventory', icon:<MdInventory/>},
        {name : 'Customers',path:'customers', icon:<FaUser/>},
        {name : 'Analytics',path:'analytics', icon:<MdAnalytics/>},
        // {name : 'Reports',path:'reports', icon:<FaFileAlt/>},
        {name : 'Settings',path:'settings', icon:<MdSettings/>},
        
    ]

    const handleLogout = () => {
        dispatch(logout())
        navigate("/")
    }
  return (
    <div>
    <div className='sideBarContainer'>
        <div className='logoContainer'>
    <img src={adminLogo} className='image' alt='adminLogo'/>
    <div className='nameContainer'>
        <h2> Food Cart</h2>
        <p> Admin Panel</p>
    </div>
    </div>
    <div className='logoutContainer' onClick={handleLogout} > 
        <MdLogout  className='logoutIcon'/>
        <span> Logout</span>
    </div>
    <div className='sideItemsContainer'>
    {sideItems.map((items) => (
        
            <NavLink className={({isActive}) => isActive ? 'sideItem active' : 'sideItem'} key={items.path} to={items.path}>{items.icon} {items.name}</NavLink>
        ))}
        </div>
    </div>
    
    
    
        
    
    </div>
  )
}

export default SideBar