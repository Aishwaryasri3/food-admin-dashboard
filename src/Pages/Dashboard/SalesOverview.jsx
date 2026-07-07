import React, { useEffect, useState } from 'react'
import './salesOverview.css'
import {LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer} from 'recharts'
import { useDispatch, useSelector } from 'react-redux'
import { fetchOrders, selectOrders } from '../../features/OrdersSlice'

const SalesOverview = () => {
  const[selectedView, setSelectedView] = useState('week')
  const orders = useSelector(selectOrders)
  

  
  const Weekdata = [
    {label: 'Sun', sales : 0},
    {label: 'Mon', sales : 0},
    {label: 'Tue', sales : 0},
    {label: 'Wed', sales : 0},
    {label: 'Thu', sales : 0},
    {label: 'Fri', sales : 0},
    {label: 'Sat', sales : 0}
  ]

  orders.forEach((order) => {
    const orderDate = new Date(order.date)
    const dayIndex = orderDate.getDay()
    const orderAmount = order.total
    
    Weekdata[dayIndex].sales += orderAmount
  })

  const Monthdata = [
    {label: 'Week 1', sales : 0},
    {label: 'Week 2', sales : 0},
    {label: 'Week 3', sales : 0},
    {label: 'Week 4', sales : 0},
    {label: 'Week 5', sales : 0}
    
  ]

  orders.forEach((order) => {
    const orderDate = new Date(order.date)
    const dayOfMonth = orderDate.getDate()
    const orderAmount = order.total
    const weekNumber = Math.ceil(dayOfMonth /7)
    Monthdata[weekNumber-1].sales += orderAmount
    

  })
  
  const Yeardata = [
    {label: 'Jan', sales : 0},
    {label: 'Feb', sales : 0},
    {label: 'Mar', sales : 0},
    {label: 'Apr', sales : 0},
    {label: 'May', sales : 0},
    {label: 'Jun', sales : 0},
    {label: 'Jul', sales : 0},
    {label: 'Aug', sales : 0},
    {label: 'Sep', sales : 0},
    {label: 'Oct', sales : 0},
    {label: 'Nov', sales : 0},
    {label: 'Dec', sales : 0}
  ]

  orders.forEach((order) => {
    const orderDate = new Date(order.date)
    const month = orderDate.getMonth()
    const orderAmount = order.total
    Yeardata[month].sales += orderAmount
    
  })

  let displayData 
  if(selectedView === 'week'){
    displayData = Weekdata
  }
  else if(selectedView === 'month'){
    displayData = Monthdata
  }
  else{
    displayData = Yeardata
  }
 

  
  return (
    <div className='salesContainer'>
        <div className='salesHeader'>
        <h3> Sales Overview</h3>
        <select value={selectedView} onChange={(e) => setSelectedView(e.target.value)}>
            <option value='week'> This Week</option>
            <option value='month'> This Month</option>
            <option value='year'> This Year</option>
        </select>
        </div >
        <div className='chartWrapper'>
        <ResponsiveContainer width='95%' height={280}>    
            <LineChart data={displayData}>
          <Line dataKey='sales' margin={{top:40, right: 20, left: 10, bottom: 10}}  type='monotone' stroke='#4f46e5' strokeWidth={2}  ></Line>
          <XAxis dataKey='label'></XAxis>
          <YAxis ></YAxis>
          <Tooltip />
        </LineChart>
        </ResponsiveContainer>
        </div>
        
    </div>
  )
}

export default SalesOverview