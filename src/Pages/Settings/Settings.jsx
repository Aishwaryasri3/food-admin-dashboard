import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login, selectUserName } from '../../features/AuthSlice'
import axios from 'axios'
import { selectTheme, toggleTheme } from '../../features/ThemeSlice'
import "./settings.css"

const Settings = () => {

   const loginName = useSelector(selectUserName)
  const[userName, setUserName] = useState(loginName)
  const[password, setPassword] = useState("")
  const[confirmPassword, setConfirmPassword] = useState('')
 const[error, setError] = useState('')
 const[successMessage, setSuccessMessage] = useState('')
 const [showConfirmPassword, setShowConfirmPassword] = useState(false)
 const[showNewPassword, setShowNewPassword] = useState(false)

 const theme = useSelector(selectTheme)
 const dispatch = useDispatch()


 const fetchAdmin = async () => {
  try{
  const response = await axios.get('http://localhost:3000/admins/1')
  setUserName(response.data.userName)
 }
 catch(error){
  setError("Failed to fetch admin details")
 }
}
  const handleSubmit = async (e) => {
    e.preventDefault()
    const updated = {
      
      userName, password}
    if(userName === "" || password === "" || confirmPassword === ''){
      setError("Please enter the credeitials")
      return
    }
    if(password !== confirmPassword){
      setError('Please enter correct password')
      return
    }
    try{
    await axios.patch('http://localhost:3000/admins/1',updated)
      dispatch(login(userName))
      setError('')
      setSuccessMessage('Profile Updated Successfully')
      setUserName('')
      setPassword('')
      setConfirmPassword('')
      setTimeout(() => {
        setSuccessMessage('')

      },3000)

    }
    catch(error){
        setError('Something went wrong')
    }
   


  }

  const handleCancel = () => {
    fetchAdmin()
    setPassword("")
    setConfirmPassword("")
    setError("")
    setShowNewPassword(false)
    setSuccessMessage(false)
    setShowConfirmPassword("")
  }
  useEffect(() => {
    fetchAdmin()

  },[])
  return (
    
      <div className={theme === "dark" ? "dark-mode" : "light-mode"}>
        <div className='settingsContainer'>
      <button type='button' onClick={() => dispatch(toggleTheme())} className='themeBtn'>  Switch to {theme === "light" ? "Dark" : "Light"}</button>
      
      <form onSubmit={handleSubmit} className='settingsForm'>

        <h2 className='settingsTitle'> Settings</h2>
        <div className='settingsGroup'>
        <label> UserName :</label>
        <input type='text' name='name' value={userName} onChange={(e) => setUserName(e.target.value)} placeholder='Enter UserName'/>
        </div>

         <div className='settingsGroup'>
          <label> New Password :</label>
          <div className='passwordField'>
          <input type={showNewPassword ? 'text' : 'password'} name='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Enter Password'/>
          <button type='button'  className='passwordBtn' onClick={() => setShowNewPassword(!showNewPassword)}> {showNewPassword ? 'hide' : 'show'}</button>
        </div>
      </div>

         <div className='settingsGroup'>
          <label> Confirm Password :</label>
          <div className='passwordField'>
          <input type={showConfirmPassword ? 'text' : 'password'} name='confirmpassword' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder='Enter Password'/>
           <button type='button' className='passwordBtn' onClick={() => setShowConfirmPassword(!showConfirmPassword)}> {showConfirmPassword ? 'hide' : 'show'}</button>
        </div>
        </div>

        {successMessage && <p className='successText'> {successMessage}</p>}
        {error && <p className='errorText'> {error}</p>}

      <div className='actionButtons'>
        <button type='submit' className='saveBtn'> Save Changes </button>
        <button type='button' onClick={handleCancel} className='cancelBtn'> Cancel  </button>
        </div>
      </form>

      </div>
    </div>
  )
}

export default Settings