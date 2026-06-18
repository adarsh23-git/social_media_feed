import React from 'react'
import { useNavigate } from 'react-router-dom'


const FrontPage = () => {

    const navigate=useNavigate()



  return (
    <div className='frontPage'>
        <h1>FeedUp</h1>
        <div className="buttons">
            <button onClick={()=>{
                navigate("/register")
            }} id='Registerbtn'>Register</button>
            <button onClick={()=>{
                navigate("/login")

            }} id='Loginbtn'>Login</button>
        </div>
      
    </div>
  )
}

export default FrontPage
