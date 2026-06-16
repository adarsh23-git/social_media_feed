const mongoose = require("mongoose");


const postSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true
    },
    fileUrl:{
        type:String,
        required:true
    },
    likes:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"userDetails"

    }],
    dislikes:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"userDetails"

    }],

    comments:[{
        username:String,
        comment:String
    }]

})

const postModel=mongoose.model("post",postSchema)

module.exports=postModel