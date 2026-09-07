import React, { useContext, useState } from 'react'
import { MenuContext } from '../../context/MenuContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import './addItem.css'

const AddItem = () => {
    const {menu, setMenu} = useContext(MenuContext)
    const [formData, setFormData] = useState({
        
            name : '',
            category: '',
            price : {
                small : '',
                medium : '',
                large : ''
            },
            image : '',
            stock : '',
            rating : ''
        
    })

    const navigate = useNavigate()
    const handleChange = (e) => {
        const {name, value} = e.target

        setFormData({
            ...formData,
            [name] : value
        })

    }

    const handlePrice = (e) => {
        const {name, value} = e.target
        setFormData({
            ...formData,
            price : {
                ...formData.price,
                [name] : value
            }
        })


    }

    const addItem = async (e) => {

        e.preventDefault()
   
        if(!formData.name ||
            !formData.category ||
            !formData.price.small ||
            !formData.price.medium ||
            !formData.price.large ||
            !formData.image ||
            !formData.stock ||
            !formData.rating
        ) {
            alert('Please fill all the details')
            return
        }
        if(formData.stock <= 0){
            alert('Stock must be atleast 1')
            return
        }
        const newItem = {
            id : Date.now(),
            ...formData,
            stock: Number(formData.stock)
        }
        try{
         await axios.post('https://food-cart-4d5c.onrender.com/foods', newItem)
        setMenu((prev) => [...prev, newItem])
        navigate('/inventory')
        }
        catch(error){
            alert('Failed to add item')
        }
    }
    
  return (
    <div className='addContainer'>
        <div className='addBox'>
        <h1 className='addTitle'> Add Item</h1>

        <form onSubmit={addItem} className='addForm'>
            <div className='formGroup'>
                <label> Name</label>
                <input type='text' name='name' value={formData.name} onChange={handleChange} />
            </div>

            <div className='formGroup'>
                <label> Category</label>
                <input type='text' name='category' value={formData.category} onChange={handleChange}/>
            </div>


            <div className='priceRow'>
            <div className='formGroup'>
                <label> Small Price</label>
                <input type='text' value={formData.price.small} name='small' onChange={handlePrice}/>
            </div>

            <div className='formGroup'>
                <label> Medium Price</label>
                <input type='text' value={formData.price.medium} name='medium' onChange={handlePrice}/>
            </div>

            <div className='formGroup'>
                <label> Large Price</label>
                <input type='text' value={formData.price.large} name='large' onChange={handlePrice}/>
            </div>
            </div>

            <div className='formGroup'>
                <label> Image</label>
                <input type='text' name='image' value={formData.image} onChange={handleChange}/>
            </div>

            <div className='formGroup'>
                <label> Stock</label>
                <input type='number' name='stock' value={formData.stock} onChange={handleChange}/>
            </div>

            <div className='formGroup'>
                <label> Rating</label>
                <input type='text' name='rating' value={formData.rating} onChange={handleChange}/>
            </div>

            <button type='submit'  className='addBtn'> Add New Item</button>
        </form>
        </div>
    </div>
  )
}

export default AddItem