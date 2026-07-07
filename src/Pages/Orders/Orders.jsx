import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchOrders, selectOrders, selectLoading, selectError, selectViewOrder, setViewOrder } from '../../features/OrdersSlice'
import { updateOrders } from '../../features/OrdersSlice'
import './orders.css'
const Orders = () => {
  const orders = useSelector(selectOrders)
  const loading = useSelector(selectLoading)
  const error = useSelector(selectError)
  const viewOrder = useSelector(selectViewOrder)
  const dispatch = useDispatch()


  const handleView = (order) => {
    dispatch(setViewOrder(order))


  }
  useEffect(() => {
    dispatch(fetchOrders())
  },[dispatch])
 if(loading) {
  return <h2> Loading...</h2>
 }
 if(error){
  return <h1> Error: {error}</h1>
 }
  return (
    <div className='ordersContainer'>
      <h1 className='ordersTitle'>Orders</h1>

        {viewOrder && (
          <div className='viewBox'>
            <h2> Order Details</h2>
            <p>
              <b> Order ID : </b>
              {viewOrder.id}
            </p>
            <p>
              <b> Customer</b>
              {viewOrder.user}
            </p>
            <p>
              <b> Status : </b>
              {viewOrder.status}
            </p>
            <p> 
              <b> Payment : </b>
              {viewOrder.paymentStatus}
            </p>
            <p>
              <b> Total : </b>
              {viewOrder.total}
            </p>

            <div>
              <h3> Items : </h3>
              {viewOrder.items.map((item) => ( 
                <div key={item.itemId}>
                  {item.name} * {item.qty} = ₹ {item.price}
                  </div>
              ))}
              </div>
            <button onClick={() => dispatch(setViewOrder(null))}> Close</button>
            </div>
        )}


      {orders.length === 0 ? (
        <p className='noOrders'> No Orders Found</p>
      ) :
      <div className='ordersList'>
        {orders.map((order) => (
          <div key={order.id} className='orderCard'>
            <div className='orderHeader'>
              
              <h3 className='orderId'> Order ID : {order.id}</h3>
              <span className={`status ${order.status.toLowerCase()}`}>{order.status}</span>
              </div>

            <p className='orderCustomer'>
              <b>Customer :</b> {order.user}
            </p>

            <p className='orderPayment'>
              <b> Payment :</b>
              {order.paymentStatus}
            </p>

            <p className='orderTotal'>
              <b>Total : </b>
              ₹{order.total}
            </p>

            <p className='orderDate'>
              <b>Date : </b>
              {order.date}
              
            </p>


              <div className='orderActions'>
                <button className='viewBtn' onClick={() => handleView(order)}> View</button>
                
                {order.status !== 'delivered' && order.status !== 'cancelled' && (
                    <button className='cancelBtn' onClick={() => dispatch(updateOrders({order ,status : 'cancelled' }))} disabled={order.status === 'cancelled'} type='button'> {order.status === 'cancelled' ? 'Cancelled' : 'Cancel'}</button>
                )}


                {order.status === 'pending' && (
                    <button type='button' className='prepareBtn' onClick={() => dispatch(updateOrders({order, status : 'preparing' }))} > Preparing</button>
                )}

                {order.status === 'preparing' && (
                    <button  type='button' className='deliverBtn' onClick={() => dispatch(updateOrders({order, status : 'delivered' }))} > Delivered</button>
                )}

             </div>

             </div>
        ))}
       
     
      </div>
      }
</div>
  )
}

export default Orders