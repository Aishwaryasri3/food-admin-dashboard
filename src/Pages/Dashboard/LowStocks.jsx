import React, { useContext } from 'react'
import './lowStocks.css'
import { MenuContext } from '../../context/MenuContext'

const LowStocks = () => {

  const {menu} = useContext(MenuContext)
  

  const filterStock = menu.filter((item) => {
    return item.stock < 5
  })

  const filterSort = [...filterStock].sort((a,b) => {
    return a.stock - b.stock
  })
  

  return (
    <div className='stockContainer'>
      <div className='stockHeader'>
        <h3> Low Stock Alert</h3>
        </div>
        <div className='stockList'>
          {filterStock.length === 0 ? (
            <p> No Low stock items.</p>
          ):
          filterSort.map((item) => (
            <div className='stockItem' key={item.id}>
              <span className='itemName'> {item.name} </span>
              <span className='itemStock'> {item.stock} items left</span>
              </div>
          ))}
        </div>
    </div>
  )
}

export default LowStocks