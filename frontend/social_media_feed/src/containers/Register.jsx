import axios from 'axios'
import React, { useState } from 'react'
import { toast } from 'react-toastify'


const Register = () => {
    const [message, setmessage] = useState("")

    const handleSubmit=async(e)=>{
        e.preventDefault()
    
       const data = {
            username: e.target.username.value,
            email: e.target.email.value,
            password: e.target.pass.value
        };
       try{
        const res= await axios.post("http://localhost:3000/api/auth/register",data);
        
        
        console.log("success")
        console.log(res.data)
        // setmessage("you have successfully Register")
        // setmessage(res.data.message)
        toast.success("Registration Successfully")   //popup message
        }
        
    
       catch(err){
        console.log(err)
       }
     


    }
  return (
    <div className="center">
        <div className="loginBox">
            <div className="welcomeDiv"><h1>Welcome</h1></div>

            <div className="details">
                <div className="paragraph"><h1>Register</h1></div>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="username">user name</label>
                    <input type="text" id='username' name='username' required/>
                    <label htmlFor="email">email</label>
                    <input type="email" id='email' name='email' required />
                    <label htmlFor="pass">Password</label>
                    <input type="password" id='pass' name='pass' required />
                    <input type="submit" id='btn' value='Register'/>
                </form>

                {/* <h2>{message}</h2>           // aa raha he par register button ke pichhe */}
 
            </div>
        </div>

    </div>
  )
}

export default Register
