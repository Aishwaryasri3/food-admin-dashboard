import React from 'react'
import './recentOrders.css'
import { useSelector } from 'react-redux'
import { selectOrders } from '../../features/OrdersSlice'

const RecentOrder = () => {
  const orders = useSelector(selectOrders)
  const sortOrder = [...orders].sort((a,b) => {
    const aDate = new Date(a.date)
    const bDate = new Date(b.date)
    return bDate - aDate
  })
  const sliceOrder = sortOrder.slice(0,5)
  return (
    <div className='recentOrdersContainer'>
        <h3>Recent Orders </h3>
        <table>
          <thead>
            <tr>
            <th> Order Id</th>
            <th> Customer</th>
            <th> Items</th>
            <th> Amount</th>
            <th> Status</th>
            </tr>
          </thead>
          <tbody>
            {sliceOrder.map((order) => (
              <tr key = {order.id}> 
                <td>{order.id}</td>
                <td> {order.user}</td>
                <td> {order.items.map((item) => item.name).join(' , ')}</td>
                <td> ₹{order.total}</td>
                <td className={ order.status}> {order.status.charAt(0).toUpperCase()+order.status.slice(1)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        </div>
  )
}

export default RecentOrder