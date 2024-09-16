require('dotenv').config()
const express = require('express')
const connectToDatabase = require('./database')
const Blog = require('./model/blogModel')
const app = express()
app.use(express.json())
const {multer,storage}=require('./middleware/mullterConfig')
const upload=multer({storage:storage})
connectToDatabase()

app.get('/', function (req, res) {
  res.json({
    message: "This is my homepage"
  })
})



app.post('/blog',upload.single('image'), async (req, res)=> {
   const {title,subtitle,description,image}=req.body
   const filename=req.file.filename
   if(!title||!subtitle||!description){
    return res.status(400).json({
      message: "Please provide title,description,subtitle,image"
    })
   }
   await Blog.create({
    title :title,
    subtitle:subtitle,
    description:description,
    image:filename
   })

  res.status(200).json({
    message:"Blog api hit successfull"
  })
})



app.get("/blog",async (req,res)=>{
const blogs=  await Blog.find()
res.status(200).json({
  message:"Data fetched Successfully",
  data: blogs
})
}) 


app.get("/blog/:id",async(req,res)=>{
  const id=req.params.id;
  const blog=await Blog.findById(id)
  if(!blog){
    return res.status(404).json({
      message:"No data found"
    })
  }

  res.status(200).json({
    message:"Data fetched Successfully",
    data: blog
  })
})


app.delete("/blog/:id",async (req,res)=>{
  const id=req.params.id;
 await Blog.findByIdAndDelete(id)
 res.status(200).json({
  message:"Blog deleted Successfully"
 })
})






app.use(express.static('./storage'))


app.listen(process.env.PORT,()=>{
    console.log("Nodejs prject has startes");
})


