import React, { useContext, useState } from 'react'
import { MenuContext } from '../../context/MenuContext'
import { FaStar } from 'react-icons/fa'
import './categories.css'

const Categories = () => {
  const [selectedCategory, setSelectedCategory] = useState('All')
  
  const {menu} = useContext(MenuContext)
  const handleCategory = (item) => {
    setSelectedCategory(item)
  }



  const categories = ['All', 
    ...new Set(menu.map((item) => item.category))
  ]

  const normalize = selectedCategory.toLowerCase()
  const filteredMenu =  
    normalize === 'all' ? menu : 
    menu.filter((item) => item.category.toLowerCase() === normalize)
  
  return (
    <div className='categoriesContainer'>
      <h1 className='categoriesTitle'>Categories </h1>

      <div className='categoriesButtons'>
      {categories.map((item) => (
        <button key={item}
           onClick={() => handleCategory(item)}
          className={selectedCategory === item ? 'categoryBtn activeCategory' : 'categoryBtn'}
            > {item}</button>
          
      ))}
      </div>

      <div className='categoriesGrid'>


      {filteredMenu.length === 0 ? (
        <p> No items available</p> ) : 
        (
            filteredMenu.map((item) => (
        <div key={item.id} className='categoryCard'>
          <h3> {item.name}</h3>

          <p className='foodCategory'> {item.category} </p>

          <p className='foodPrice'> 
            ₹{item.price.small} / ₹{item.price.medium} / ₹{item.price.large}
            </p>
            <p className='foodRating'> <FaStar  color='gold'/>{item.rating}</p>
          </div>
      )))}
      </div>
      </div>
  )
}

export default Categories