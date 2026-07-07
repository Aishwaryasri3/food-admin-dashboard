import React,{useEffect} from 'react'
import DashboardHeader from './DashboardHeader'
import './dashboard.css'
import DashboardStatscard from './DashboardStatscard'
import SalesOverview from './SalesOverview'
import RecentOrder from './RecentOrder'
import SellingItems from './SellingItems'
import OrderStatus from './OrderStatus'
import LowStocks from './LowStocks'
import { useDispatch, useSelector } from 'react-redux'
import { fetchOrders, selectOrders } from '../../features/OrdersSlice'
const Dashboard = () => {
  const orders = useSelector(selectOrders)
  const dispatch = useDispatch()

   useEffect(() => {
        dispatch(fetchOrders())
        const interval = setInterval(() => {
            dispatch(fetchOrders())
        },5000)
        return () => clearInterval(interval)
    },[dispatch])
  return (
    <div className='dashboardContainer'>
      <DashboardHeader />
      <DashboardStatscard />
      <div className='dashboardContentRow'>
      <SalesOverview />
      <RecentOrder />
      </div>
      <div className='dasboardBottom'>
        <SellingItems />
        <OrderStatus />
      <LowStocks />
      </div>
    </div>
  )
}

export default Dashboard