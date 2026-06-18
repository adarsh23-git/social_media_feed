import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const Login = () => {

    const [message, setmessage] = useState("")

    const navigate=useNavigate()

    const handleSubmit=async(e)=>{
        e.preventDefault()

        const data={
            login:e.target.login.value,
            // email:e.target.email.value,
            password:e.target.pass.value

        }
    
       
       try{
        const res= await axios.post("http://localhost:3000/api/auth/login",data,{
            withCredentials:true
        })

        setmessage("login Successfully")
        console.log(res.data)
        toast.success("login successfully"),
        navigate("/create")

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
                    <label htmlFor="login">user name/email</label>
                    <input type="text" id='login' name='login' required/>
                    {/* <label htmlFor="email">email</label>
                    <input type="email" id='email' name='email' required /> */}
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
