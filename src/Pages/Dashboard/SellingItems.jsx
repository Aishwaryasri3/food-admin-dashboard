import React, { useState } from 'react'
import './sellingItems.css'
import { useSelector } from 'react-redux'
import { selectOrders } from '../../features/OrdersSlice'

const SellingItems = () => {
    const orders = useSelector(selectOrders)
    
    const[selectedView, setSelectedView] = useState('week')


    const today = new Date()

    const filterOrders = orders.filter((order) => {
        const orderDate = new Date(order.date)
        const currentyear = today.getFullYear()
        const orderYear = orderDate.getFullYear()
        if(selectedView === 'week'){
        const diffTime = today - orderDate
        const diffDays = diffTime / (1000 * 60 * 60 *24)
        return diffDays >= 0 && diffDays < 7
    }
    else if(selectedView === 'month'){
        const currentmonth = today.getMonth()
        const orderMonth = orderDate.getMonth()
        return (
        currentmonth === orderMonth && currentyear === orderYear
        )
        
        

    }

    else if(selectedView === 'year')
        {
        return currentyear === orderYear
    }
        
        
    })

    const sellingOrders = filterOrders.reduce((acc,order) => {

        order.items.forEach((item) => {
            if(acc[item.name]){
                acc[item.name] += item.qty
            }
            else{
                acc[item.name] = item.qty
            }
        })
        return acc


    },{})
    const sortedItems = Object.entries(sellingOrders).sort((a,b) => {
        return b[1] - a[1]
    })
    const sliceOrders = sortedItems.slice(0,5)

    const handleOrder = (e) => {
        setSelectedView(e.target.value)
    }


    
    
    const totalQty = sliceOrders.reduce((acc, item) => {
            return acc+item[1]
    },0)
    
  
  return (
    <div className='sellingItemsContainer'>
        <div className='sellingHeader'>
        <h3> Top Selling Items</h3>
        <select value={selectedView} onChange={handleOrder}>
            <option value='week'> This Week</option>
            <option value='month'> This Month</option>
            <option value='year'> This Year</option>
        </select>
        </div>
        <div className='sellingList'>
            {sliceOrders.length === 0 ? (
                <p className='noSales'> No sales available.</p>
            ) : (
            sliceOrders.map(([name, qty] ) => {
                const percentage = totalQty > 0 ? ((qty / totalQty) * 100).toFixed(1) : 0
                return(
                    <div key={name} className='sellingItem'>
                    <div className='itemTop'>
                    <span className='name'> {name}</span>
                    <span className='orders'> {qty} orders</span>
                    <span className='percent'> {percentage} %</span>
                    </div>
                    <div className='progressBar' >
                        <div style={{width:`${percentage}%`}} className='barFill'> </div>
                        </div>
                    </div>

                )
            })
                
                    
            )}
        </div>
    </div>
  )
}

export default SellingItems