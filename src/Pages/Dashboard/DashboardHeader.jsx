import React from 'react'
import './dashboardheader.css'
import { FaUserCircle } from 'react-icons/fa'
import { FiCalendar } from 'react-icons/fi'
import { useSelector } from 'react-redux'
import { selectUserName } from '../../features/AuthSlice'
const DashboardHeader = () => {
    const today = new Date()
    const userName = useSelector(selectUserName)
   
  return (
    <div className='dashboardHeader'>
        <div className='leftSection'>
            <h1> Welcome Back, {userName}!🖐</h1>
            <p> Here's what's happening with your food cart today.</p>
        </div>
        <div className='rightSection'>
            
            <div className='profileContainer'>
                <span className='profileIcon'> <FaUserCircle /> </span>
                <div className='textContainer'>
                    <span className='admin'> {userName}</span>
                    <span className='owner'> Owner</span>
                
                <div className='dateContainer'>
                    <FiCalendar />
                       <span> {today.toLocaleDateString()} </span>
                </div>
                </div>


            </div>
        </div>
    </div>
  )
}

export default DashboardHeader