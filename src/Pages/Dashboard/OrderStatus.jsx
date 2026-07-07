import React from 'react'
import './orderStatus.css'
import {PieChart, Pie, Tooltip, Cell} from 'recharts'
import { useSelector } from 'react-redux'
import { selectOrders } from '../../features/OrdersSlice'

const OrderStatus = () => {
  const orders = useSelector(selectOrders)

  const orderStatus = orders.reduce((acc, order) => {
    if(acc[order.status] !== undefined){
       acc[order.status] += 1
    }
    
    return acc

  },{
    pending : 0,
    preparing : 0,
    delivered : 0,
    cancelled : 0
  })



  const data = Object.entries(orderStatus).map(([name, value]) => ({
          name : name.charAt(0).toUpperCase() + name.slice(1),
          value
}))

const colors = {
  Pending : '#f59e0b',
  Preparing : '#3b82f6',
  Delivered : '#22c55e',
  Cancelled : '#ef4444'
}
  console.log(orderStatus)
  return (
    <div className='orderContainer'>
        <h3> Order Status</h3>
        <PieChart width={250} height={250}> 
          <Pie data={data} dataKey='value' nameKey='name' innerRadius={60} outerRadius={90}  > 
            {data.map((entry) => (
              <Cell key={entry.name} fill={colors[entry.name]}/>
            ))}
            </Pie>
          <Tooltip />
        </PieChart>
        
    </div>
  )
}

export default OrderStatus