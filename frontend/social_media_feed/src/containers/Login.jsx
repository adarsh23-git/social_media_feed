import React from 'react'
import axios from 'axios'

const Login = () => {
    const handleSubmit=async(e)=>{
        e.preventDefault()
    
       const formData=new FormData(e.target)
       try{
        axios.post("http://localhost:3000/login",formData)

       }
       catch(err){
        console.log(err)
       }
     


    }

  return (
    <div className="center">
        <div className="loginBox">
            <div className="welcomeDiv"><h1>Welcome Back</h1></div>

            <div className="details">
                <div className="paragraph"><h1>Login</h1></div>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="username">user name</label>
                    <input type="text" id='username' name='username' required/>
                    <label htmlFor="email">email</label>
                    <input type="email" id='email' name='email' required />
                    <label htmlFor="pass">Password</label>
                    <input type="password" id='pass' name='pass' required />
                    <input type="submit" id='btn' value='Login'/>
                </form>
            </div>
        </div>

    </div>
    
      
    
  )
}

export default Login
