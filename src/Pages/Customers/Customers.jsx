import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchOrders, selectOrders } from '../../features/OrdersSlice'
import './customers.css'

const Customers = () => {
  const orders = useSelector(selectOrders)
  const dispatch = useDispatch()
  const customers = orders.reduce((acc, cust) => {
     if(acc[cust.user]){
      acc[cust.user].totalOrders +=1
      acc[cust.user].totalSpent += cust.total
      acc[cust.user].items = acc[cust.user].items.concat(cust.items)

     }
     else {
      acc[cust.user] = {
      user  : cust.user,
      totalOrders : 1,
      totalSpent : cust.total,
      items : cust.items
      }
     }
     return acc
  },{})
  

  useEffect(() => {
    dispatch(fetchOrders())
  },[dispatch])
  return (
    <div className='customersContainer'>
      <h1 className='customersTitle'> Customers </h1>
      <div className='customersGrid'>
      {Object.values(customers).length === 0 ? (
        <p> No customers available</p>
      ): (Object.values(customers).map((customer) => (
          <div key={customer.user} className='customerCard'>
            <h2 className='customerName'>  {customer.user}</h2>

            <p className='customerInfo'>
            <strong>  Total Orders : </strong> {customer.totalOrders}
            </p>

            <p className='customerInfo'>
            <strong> Total Spent : </strong>{ customer.totalSpent} 
            </p>

            <h4 className='itemsTitle'> Items Purchased</h4>
            
            <div className='itemsList'>
              
              {customer.items.map((item, index) => (
                
                <p key={index} className='itemText'>
                   {item.name} * {item.qty}
                   </p>
                  
              ))}
              </div>

            </div>
      )))}
      </div>
    </div>
  )
}

export default Customers