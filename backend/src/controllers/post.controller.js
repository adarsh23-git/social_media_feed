const jwt=require('jsonwebtoken')
const postModel = require("../models/post.model");
const { uploadFile } = require("../services/storage.service");
const { default: mongoose } = require('mongoose');


async function createPost(req,res){

    const token=req.cookies.token
    console.log("cookies:", req.cookies)
    console.log("token:", req.cookies.token)

    if(!token){
        return res.status(401).json({
            message:"Invalid access"
        })
    }

    try{
        const {title,description}=req.body
        const file=req.file

        const result=await uploadFile(file.buffer.toString('base64'))

        const post=await postModel.create({
            title,
            description,
            fileUrl:result.url
        })

        res.status(201).json({
            message:"post created successfully",
            postDetails:{
                id:post._id,
                title:post.title,
                description:post.description,
                url:post.fileUrl
            }
        })
        
    }
    catch(err){
        console.log(err)
        res.status(401).json({
            message:"Unauthorized"
        })
    }
  
}

async function showPost(req,res){

    const showpost=await postModel.find()

    res.status(200).json({
        message:"post fetched successfully",
        showpost
    })
}

async function countLikes(req,res){

    const token=req.cookies.token
    if(!token){
        return res.status(401).json({
            message:"Unauthorized"
        })

    }

    const decoded=await jwt.verify(token,process.env.JWT_SECRET)

    const userId=decoded.id

    const {postId}=req.params

    console.log("postId",postId)

    const findPost=await postModel.findById(postId)

    console.log("findPost",findPost)

    if(!findPost){
        return res.status(404).json({
            message:"post not found"
        })
    }

    const alreadyLike=await findPost.likes.includes(userId)

    if(alreadyLike){
        findPost.likes=findPost.likes.filter(
            (id)=>id.toString()!==userId
        )
    }
    else{
        findPost.likes.push(userId)

    }

    

    await findPost.save()

    res.json({
        totalLikes:findPost.likes.length
    })

}



async function countdisLikes(req,res){

    const token=req.cookies.token
    if(!token){
        return res.status(401).json({
            message:"Unauthorized"
        })

    }

    const decoded=await jwt.verify(token,process.env.JWT_SECRET)

    const userId=decoded.id

    const {postId}=req.params

    const findPost=await postModel.findById(postId)

    if(!findPost){
        return res.status(404).json({
            message:"post not found"
        })
    }

    const alreadydisLike=await findPost.dislikes.includes(userId)

    if(alreadydisLike){
        return res.json({
            message:"already like"
        })
    }

    findPost.dislikes.push(userId)

    await findPost.save()

    res.json({
        totaldisLikes:findPost.dislikes.length
    })

}

async function comments(req,res){

    const token=req.cookies.token

    if(!token){
        return res.status(401).json({
            message:"Unauthorized"
        })
    }

    
    const decoded=await jwt.verify(token,process.env.JWT_SECRET)

    const username=decoded.username

    // const user = await userModel.findById(decoded.id, "username");
    // const username = user.username;                          database se username fetch karega

    const {postId}=req.params
    const {comment}=req.body

    const commentPost=await postModel.findById(postId)

    await commentPost.comments.push({
        username,
        comment
    })

    await commentPost.save()

    res.json({
        username:username,
        comment:comment
    })
}

module.exports={createPost,countLikes,countdisLikes,comments,showPost}