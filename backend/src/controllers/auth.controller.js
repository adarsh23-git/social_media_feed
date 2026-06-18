const userModel = require("../models/user.model");
const jwt=require("jsonwebtoken")
const bcrypt=require("bcryptjs");



async function userRegister(req,res){
    const {username,email,password}=req.body

    const isUserAlreadyExist=await userModel.findOne({
        $or:[
            {username},
            {email}
        ]
    })
    if(isUserAlreadyExist){
        return res.status(409).json({
            message:"user already exist"
        })
    }
    const hash=await bcrypt.hash(password,10)

    const user=await userModel.create({
        username,
        email,
        password:hash
    })

    const token=jwt.sign({
        id:user._id
    },process.env.JWT_SECRET)

    res.cookie("token",token)

    res.status(201).json({
        message:"user register successfully",
        user:{
            id:user._id,
            username:user.username,
            email:user.email

        }
    })



}

async function userLogin(req,res){

    // const {username,email,password}=req.body
    const {login,password}=req.body

    const userFind=await userModel.findOne({
        $or:[
            // {username},
            // {email}

            {username:login},
            {email:login}
        ]
    })

    if(!userFind){
        return res.status(401).json({
            message:"Invalid Credential"
        
        })
    }
    
    const isPasswordValid=await bcrypt.compare(password,userFind.password)

    if(!isPasswordValid){
        return res.status(401).json({
            message:"Invalid Credential"
        })
    }

    const token=jwt.sign({
        id:userFind._id,
        username:userFind.username

    },process.env.JWT_SECRET)

    res.cookie("token",token,{
        httpOnly:true
    })
    console.log("cookie set")

    res.status(200).json({
        message:"user login successfully",
        user:{
            id:userFind._id,
            username:userFind.username,
            email:userFind.email
        }
    })

}

module.exports={userRegister,userLogin}