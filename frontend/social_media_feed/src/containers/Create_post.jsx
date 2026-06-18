import axios from 'axios'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const Create_post = () => {

  const navigate=useNavigate()

  const handleSubmit=async(e)=>{
    e.preventDefault()

    const formData=new FormData(e.target)

    try{
      const res=await axios.post("http://localhost:3000/api/post/create",formData,
        {withCredentials:true},
        navigate("/posts")
      )
      console.log(res.data)
      

    }
    catch(err){
      console.log(err)
    }




  }



  return (
    <div className="createBox">
      <div className='create'>

      <form onSubmit={handleSubmit}>
        <div className="formFile">
          <label htmlFor="fileUrl">file</label>
          <input type="file" id='fileUrl' name='fileUrl' /><br></br>
          <label htmlFor="title">title</label>
          <input type="text" id='title' name='title' /><br></br>
          <label htmlFor="description">description</label>
          <input type="text" name="description" id="description" /><br></br>
          <button value="submit">submit</button>

        </div>
        
      </form>
      
    </div>

    </div>
    
  )
}

export default Create_post

