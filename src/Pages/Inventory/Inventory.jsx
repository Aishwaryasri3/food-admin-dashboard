import React, { useState } from 'react'
import MenuItems from '../Menu-Items/MenuItems'
import Categories from '../Categories/Categories'
import './inventory.css'

const Inventory = () => {
  const[active, setActive] = useState('menu')
  return (
    <div className='inventoryContainer'>
      <h1 className='inventoryTitle'>Inventory</h1>
      <div className='tabContainer'>
      <button onClick={() => setActive('menu')} className={`tabBtn ${active === 'menu' ? 'activeTab' : ''}`}> Menu Items</button>
      <button onClick={() => setActive('categories')} className={`tabBtn ${active === 'categories' ? 'activeTab':''}`}> Categories</button>
        </div>
      {active === 'menu' ? 
        <MenuItems />
         : 
        <Categories />
        }
      
      </div>
  )
}

export default Inventory