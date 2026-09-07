import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {  useDispatch } from 'react-redux'
import { login } from '../../features/AuthSlice'
import axios from "axios"
import './login.css'
const Login = () => {
    const[userName, setUserName] = useState("")
    const[password, setPassword] = useState('')
    const [admin, setAdmin] = useState([])

    const[error, setError] = useState('')
        const navigate = useNavigate()

       
        const dispatch = useDispatch()
    const handleLogin = (e) => {
        e.preventDefault()
        console.log('handleLogin')
        if(userName.trim() !== admin[0]?.userName ){
            setError('Please check Username')
        }
       else if(password.trim() !== admin[0]?.password){
            setError('Please check password')
        }
        else{
            setError('')
            localStorage.setItem("adminUser",JSON.stringify({
                userName,
                isLoggedIn : true
            }))
           
            dispatch(login(userName))
            
            navigate('/dashboard')
        }
        
            
    }

    const fetchadmin = async () => {
        
        const response = await axios.get("https://food-cart-4d5c.onrender.com/admins")
        setAdmin(response.data)
       
        
    }

    useEffect(() => {
        fetchadmin()

    },[])
  return (
    <div className='loginContainer'>
        <div className='loginCard'>
        <h1 className='loginTitle'> Login</h1>
        {error && <p className='errorText'> {error} </p>}
        <form onSubmit={handleLogin} className='loginForm'>
            <div className='inputGroup'>
            <label> UserName : </label>
            <input value={userName} onChange={(e) => {
            setUserName(e.target.value) 
                setError("")}} placeholder='Enter userName'/>
            </div>

            <div className='inputGroup'>
                <label> Password</label>
                <input value={password} onChange={(e) =>{ 
                    setPassword(e.target.value) 
                    setError("")}} placeholder='Enter password' type='password' />
            </div>

            <button type='submit' className='loginBtn'> Login</button>

        </form>
    </div>
    </div>
  )
}

export default Login