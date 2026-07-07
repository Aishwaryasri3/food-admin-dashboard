import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchOrders, selectOrders } from '../../features/OrdersSlice'
import {LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer} from 'recharts'
import './analytics.css'

const Analytics = () => {
  const orders = useSelector(selectOrders)
  const dispatch = useDispatch()

  const totalOrders = orders.length

  const totalUsers = new Set(orders.map((order) => order.user)).size

  const totalRevenue = orders.reduce((acc, order) => {
        return acc + order.total
  },0)

  const pendingOrders = orders.filter((order) => order.status === 'pending').length

  const deliveredOrders = orders.filter((order) => order.status === 'delivered').length

  const averageOrderValue = totalOrders > 0 ?  totalRevenue / totalOrders  : 0


  const customer = orders.reduce((acc, order) => {
      if(acc[order.user]){
        acc[order.user].total += order.total
        
      }
      else{
        acc[order.user] = {
          user : order.user,
          total : order.total,
                  }
      }
      return acc
  },{})

  const topCustomer = Object.values(customer).reduce((acc, curr) => {
    return curr.total > acc.total ? curr : acc
  },{user:'', total:0})

  const itemQuantity = orders.reduce((acc,order) => {
      for(let item of order.items){
        if(!acc[item.name]){
            acc[item.name] = 0
        }
          acc[item.name] += item.qty
      }
      return acc
  },{})

const topItem = Object.entries(itemQuantity).reduce((acc, curr) => {
      return curr[1] > acc[1] ? curr : acc
}, ['', 0])

const latestOrder = [...orders].sort((a,b) => {
  return new Date(b.date) - new Date(a.date)
}).slice(0,5)

const monthlyRevenue = orders.reduce((acc, order) => {

  const month = new Date(order.date).toLocaleString('default', {
    month : 'long'
  })

      if(!acc[month]){
          acc[month] = 0
      }
      acc[month] += order.total
      return acc

},{})

const chartData = Object.entries(monthlyRevenue).map(([month, revenue]) => ({
  month, revenue
}))
  
  useEffect(() => {
    dispatch(fetchOrders())

  },[dispatch])
  
  
  return (
    <div className='analyticsContainer'>
      <h2 className='analyticsTitle'> Analytics Dashboard </h2>

      <div className='statsGrid'>
        <div className='statCard'>TotalOrders : {totalOrders} </div>
        <div className='statCard'>Users : {totalUsers} </div>
        <div className='statCard'> Revenue : ₹{totalRevenue}</div>
        <div className='statCard'> Pending : {pendingOrders}</div>
        <div className='statCard'> Delivered : {deliveredOrders} </div>
        <div className='statCard'> Average Order: ₹{averageOrderValue.toFixed(2)}</div>
      </div>

      <div className='customerSection'>
        <div className='customerCard'>
           Top Customer : {topCustomer.user} - ₹{topCustomer.total}
        </div>

        <div className='customerCard'>
          Top Item : {topItem[0]} - {topItem[1]} qty
        </div>
        </div>

        <div className='latestOrders'>
        <h3> Latest Orders</h3>

      {orders.length === 0 ? ( 
        <p> N orders</p> )
        : (latestOrder.map((order) => (
        <div key={order.id} className='orderCard'>
          <p> User : {order.user}</p>
          <p> Total : {order.total}</p>
        </div>
      )))}
     </div>

     <div className='chartContainer'>
      <h3> Monthly Revenue</h3>
     <ResponsiveContainer width='100%' height={300}>
      <LineChart data={chartData}>
        <XAxis dataKey='month' />
        <YAxis />
        <Tooltip />
        <Line dataKey='revenue' type='monotone' stroke = '#8884d8' strokeWidth={2}/>

      </LineChart>

     </ResponsiveContainer>

     </div>
    </div>
  )
}

export default Analytics