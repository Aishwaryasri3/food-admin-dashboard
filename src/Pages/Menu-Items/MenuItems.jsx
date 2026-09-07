import  { useContext, useEffect, useState } from 'react'
import {FaStar} from 'react-icons/fa'
import {useNavigate} from 'react-router-dom'
import './menuItems.css'
import { MenuContext } from '../../context/MenuContext'
import axios from 'axios'
const MenuItems = () => {
 
  const[debounce, setDebounce] = useState('')
  const[search, setSearch] = useState('')
  const[filter, setFilter] = useState('all')

  const {menu, loading, error, setMenu} = useContext(MenuContext)


  const navigate = useNavigate()

  

  const filteredMenu = menu.filter((item) => {

    if(filter === 'all') return true
    return item.type === filter
  })
  .filter((item) => (

    item.name.toLowerCase().includes(debounce.toLowerCase()) ||
    item.category.toLowerCase().includes(debounce.toLowerCase())

    

  ))


  const handleDelete = async (id) => {
    await axios.delete(`https://food-cart-4d5c.onrender.com/foods/${id}`)
    const update = menu.filter((item) => item.id !== id)
    setMenu(update)
  }


  const handleNavigate = (id) => {
    navigate(`/edit/${id}`)
  }


  const handleAdd = () => {
    navigate('/addItem')
  }
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounce(search)

    },300)
    return () => clearTimeout(timer)

  },[search])


 

  if(loading){
    return <div className='spinner'> Loading...</div>
  }
  if(error){
    return <div> {error}</div>
  }
  return (
    <div>
      <div className='menuTop'>
      <h1> Menu Items</h1>
      <div className='topActions'>
        <button onClick={handleAdd} className='addBtn'> +Add</button>
        <input  value={search} onChange={(e) => setSearch(e.target.value)} placeholder='Search by food name or category...' className='searchInput'/>
      </div>
      </div>
      <div className='filterContainer'>
      <button onClick={() => setFilter('all')} className={filter === 'all' ? 'activeFilter' : 'filterBtn'}> All</button>
      <button onClick={() => setFilter('veg')} className={filter === 'veg' ? 'activeFilter' : 'filterBtn'}> Veg</button>
      <button onClick={() => setFilter('non-veg')} className={filter === 'non-veg' ? 'activeFilter' : 'filterBtn'}> Non-veg</button>
      </div>
      <div>
                </div>
            <div className='menuContainer'>

        {filteredMenu.length ===  0 ?(
          <p className='noResults'> No Result Found 🍽</p> 
        ): (
      filteredMenu.map((items) => (
        <div key={items.id} className='menuCard'>
          
          <div className='menuHeader'>
          <h2> {items.name}</h2>
          </div>
          
          <img src={items.image}  alt={items.name} className='menuImage'/>
          <div className='menuInfo'>
          <p className='category'> {items.category}</p>
          <div className='priceSection'>
          <p> Small : ₹{items.price.small}</p>
          <p> Medium : ₹{items.price.medium}</p>
          <p> Large : ₹{items.price.large}</p>
          </div>
          <p className='rating'>  <FaStar color='gold' /> {items.rating}</p>
          </div>
          <div className='actionButtons'>
            <button onClick={() => handleNavigate(items.id)}> Edit</button>
            <button onClick={() => handleDelete(items.id)}> Delete</button>
            </div>
          </div>
)))}
      </div>
    </div>
  )
}

export default MenuItems