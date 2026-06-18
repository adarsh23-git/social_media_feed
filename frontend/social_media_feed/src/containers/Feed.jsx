import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'



const Feed = () => {
    
    const [showPost, setshowPost] = useState([])

    const [comments, setcomments] = useState({})
    useEffect(()=>{
        axios.get("http://localhost:3000/api/post/posts")
        .then((res)=>{
            setshowPost(res.data.showpost)
            
        })
    },[])

    const likeFun=async(postId)=>{

      console.log("likeFun called",postId)
      await axios.post(`http://localhost:3000/api/post/like/${postId}`,
        {},
        {withCredentials:true}
      )

      const res=await axios.get("http://localhost:3000/api/post/posts")    //like hone ke baad update post ko fetch karega

      setshowPost(res.data.showpost)
    }


    const commentOnPost=async(postId)=>{

      const comment=comments[postId]

      await axios.post(`http://localhost:3000/api/post/comment/${postId}`,
        {comment},
        {withCredentials:true}
      )

      const res=await axios.get("http://localhost:3000/api/post/posts")

      setshowPost(res.data.showpost)

      setcomments({
        ...comments,
        [postId]:""
      })


    
    }




    
  return (
    <div>
      {showPost.map((post)=>{
        return(
        <div key={post._id} className="post_card">  
          <img src={post.fileUrl} alt='image or video'  />
          <p>{post.title}</p>
          <p>{post.description} </p>

          <button onClick={()=>{
            console.log("like clicked",post._id)
            
            likeFun(post._id)}}>like {post.likes.length} </button>
            {/* <label htmlFor="comments">comment</label> */}
            <input type="text" placeholder='write a comment' value={comments[post._id] || ""} onChange={(e)=>{setcomments({
              ...comments,
              [post._id]:e.target.value


            })}} />
            
            <button onClick={()=>{
                commentOnPost(post._id)}}>Send
            </button>

            <div className="comment_section">
              {post.comments?.map((c,index)=>{
                return <p key={index} >
                  <b>{c.username} :</b>
                  {c.comment}
                </p>
              })}
            </div>


        </div>
      )})
      }

      
    </div>
  )
}

export default Feed
