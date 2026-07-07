import React, { useContext, useEffect } from 'react'
import './dashboardStatscard.css'
import { FiPackage, FiDollarSign, FiUser, FiMenu, FiClock } from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux'
import {  selectOrders } from '../../features/OrdersSlice'
import { MenuContext } from '../../context/MenuContext'

const DashboardStatscard = () => {
     const orders = useSelector(selectOrders)
    const totalOrders = orders.length
    
   
    const revenue = orders.reduce((acc, order) => {
            return acc + order.total
    },0)

    const customer = new Set(orders.map((order) => order.user))

    
    const totalCustomer = customer.size


    const {menu} = useContext(MenuContext)
    const totalMenu = menu.length
    const filteredOrder = orders.filter((order) => order.status === "pending")
    const pendingOrder = filteredOrder.length
    
    const statsData = [
        {
            id: 1,
            title :'Total Orders',
            value : totalOrders,
            icon: <FiPackage />

        },
        {
            id: 2,
            title :'Revenue',
            value : revenue,
            icon: <FiDollarSign />

        },
        {
            id: 3,
            title :'Customers',
            value : totalCustomer,
            icon : <FiUser />

        },
        {
            id: 4,
            title :'Menu Items',
            value : totalMenu,
            icon: <FiMenu />

        },
        {
            id: 5,
            title :'Pending Orders',
            value : pendingOrder,
            icon: <FiClock />

        },

    ]

 
  return (
    
        <div className='statsWrapper'>
            
                {statsData.map((item) => (
                    <div key={item.id} className='statsContainer'>
                        <div className='headerSection'>
             <p className='statsheader'> {item.title}</p>
             {item.icon}
             </div>
             <h2 className='statsCount'> ₹{item.value}</h2>

            </div>
            
                ))}
            
        </div>

   
  )
}

export default DashboardStatscard