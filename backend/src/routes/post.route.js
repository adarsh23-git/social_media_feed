const express=require("express")
const postController=require("../controllers/post.controller")
const multer=require('multer')

const router=express.Router()

const upload=multer({
    storage:multer.memoryStorage()
})

router.post("/create",upload.single('fileUrl'),postController.createPost)
router.get("/posts",postController.showPost)
router.post("/like/:postId",(req,res,next)=>{
    console.log("like hit button"),
    next()
},postController.countLikes)
router.post("/dislike/:postId",postController.countdisLikes)
router.post("/comment/:postId",postController.comments)  



module.exports=router

