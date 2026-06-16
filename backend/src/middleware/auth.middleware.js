const jwt=require('jsonwebtoken')

async function authUser(req,res,next){

    const token=req.cookies.token

    if(!token){
        res.status(401).json({
            message:"Unauthorized"
        })
    }

    
}