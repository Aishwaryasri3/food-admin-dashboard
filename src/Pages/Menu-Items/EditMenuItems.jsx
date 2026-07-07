import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { MenuContext } from '../../context/MenuContext'
import "./editMenuItems.css"

const EditMenuItems = () => {


        
        const {menu, setMenu } = useContext(MenuContext)

        const[formData, setFormData] = useState({
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
        const[error, setError] = useState("")
        const[loading, setLoading] = useState(false)
    const {id} = useParams()
    const navigate = useNavigate()


    const handleChange = (e) =>{
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
            price: {
                ...formData.price,
                [name] : value
            }
        })
    }
    


    const update =  async (e) => {
        e.preventDefault();
        setLoading(true)
        setError("")
        try{
        const updateItem = menu.map((item) => item.id ==id ?{
            ...item, 
            ...formData,
            stock : Number(formData.stock)
        }:
        item
    )
    await fetch(`http://localhost:3000/foods/${id}`,
    {
        method : 'PUT',
        headers:{
         'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
            ...formData,stock: Number(formData.stock)
        })
    }
)

     setMenu(updateItem)   
     navigate('/inventory')
}
catch(error){
    setError(error.message || "Something went wrong")
}

    }
        useEffect(() => {

            
            
                const selectedItem = menu.find((item) => item.id == id)

            console.log(selectedItem)
            if(selectedItem){
                setFormData({
                    name: selectedItem.name,
                    category: selectedItem.category,
                    price : {
                        small : selectedItem.price.small,
                        medium : selectedItem.price.medium,
                        large : selectedItem.price.large
                    },
                    image : selectedItem.image || '',
                    stock : selectedItem.stock,
                    rating : selectedItem.rating || ''
                })
            
        }
        },[menu, id])

  return (

    <div className='editContainer'>
        <div className='editBox'>
        <h2 className='editTitle'> Edit Menu Item</h2>
        {error && <p className='errorText'>{error}</p>}

        <form onSubmit={update} className='editForm'>
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

            <button type='submit'  className='updateBtn' >  Update</button>
        </form>
        </div>
    </div>
  )
}

export default EditMenuItems